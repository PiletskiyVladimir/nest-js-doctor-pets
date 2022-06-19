import { Body, HttpException, HttpStatus, Injectable, Post, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../../client/client.service';
import { DoctorService } from '../../doctor/doctor.service';
import { AuthUtils } from '../../../utils/auth.utils';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { CreateDoctorDto } from '../../doctor/dto/create-doctor.dto';
import { EntityAuthInfo } from '../../../core/types/auth';
import { DisabledTokensService } from '../../disabled-tokens/disabled-tokens.service';
import { DisabledTokens } from '../../disabled-tokens/disabled-tokens.model';
import { AuthPayload, LoginReqBody } from './main-auth.constant';
import { AuthGetter } from '../../../decorators/auth-decorator';

@Injectable()
export class MainAuthController<
    T extends
        | {
              service: ClientService;
              dto: CreateClientDto;
          }
        | {
              service: DoctorService;
              dto: CreateDoctorDto;
          }
> {
    protected entityService: T['service'];
    protected dto: T['dto'];

    protected jwtService: JwtService;

    protected disabledTokensService: DisabledTokensService;

    constructor(auth: T, jwtService: JwtService) {
        this.entityService = auth.service;
        this.dto = auth.dto;

        this.disabledTokensService = new DisabledTokensService(DisabledTokens);

        this.jwtService = jwtService;
    }

    @Post('/registration')
    protected async register(@Body() createDto: T['dto']) {
        const passwordSalt = AuthUtils.generateSalt();

        const createdEntity = await this.entityService.create({ ...createDto, password_salt: passwordSalt });

        const token = this.generateToken(
            createdEntity.id,
            createdEntity.login,
            createDto instanceof CreateClientDto ? 'CLIENT' : 'DOCTOR'
        );

        return {
            entity: createdEntity,
            token: token,
        };
    }

    @Post('/login')
    protected async login(@Body() body: LoginReqBody) {
        const entityName = this.entityService instanceof ClientService ? 'Client' : 'Doctor';

        const entity = await this.entityService.getEntity({ login: body.login });

        if (!entity) throw new HttpException(`${entityName} not found`, HttpStatus.UNAUTHORIZED);

        const arePasswordsEqual = AuthUtils.comparePasswordWithPasswordInDB(
            body.password,
            entity.password_salt,
            entity.password
        );

        if (!arePasswordsEqual) throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);

        const token = this.generateToken(
            entity.id,
            entity.login,
            this.entityService instanceof ClientService ? 'CLIENT' : 'DOCTOR'
        );

        return {
            token: token,
        };
    }

    @Post('/logout')
    protected async logout(@Request() req: Request, @AuthGetter() entity: EntityAuthInfo): Promise<void> {
        const entityId = this.entityService instanceof ClientService ? entity.user_id : entity.doctor_id;

        const token = AuthUtils.getTokenFromAuthString(req.headers.get('authorization'));

        await this.disabledTokensService.create({
            token: token,
            entity_id: entityId,
        });

        return;
    }

    protected generateToken(entityId: number, login: string, entityType: 'DOCTOR' | 'CLIENT') {
        const payload: AuthPayload = {
            login: login,
            id: entityId,
        };

        switch (entityType) {
            case 'CLIENT':
                payload.userId = entityId;
                break;
            case 'DOCTOR':
                payload.doctorId = entityId;
                break;
        }

        return this.jwtService.sign(payload);
    }

    protected async checkIfTokenIsNotDisabled(token: string): Promise<boolean> {
        return await this.disabledTokensService.exists({ token });
    }
}
