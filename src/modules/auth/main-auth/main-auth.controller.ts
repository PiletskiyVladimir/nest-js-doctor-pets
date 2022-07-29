import { Body, Headers, HttpException, HttpStatus, Injectable, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../../client/client.service';
import { DoctorService } from '../../doctor/doctor.service';
import { AuthUtils } from '../../../utils/auth.utils';
import { EntityAuthInfo } from '../../../core/types/auth';
import { DisabledTokensService } from '../../disabled-tokens/disabled-tokens.service';
import { DisabledTokens } from '../../disabled-tokens/disabled-tokens.model';
import { AuthPayload, LoginReqBody } from './main-auth.constant';
import { AuthGetter } from '../../../decorators/auth-decorator';
import { JwtAuthGuard } from '../../../guards/auth-guard';

@Injectable()
export class MainAuthController<T extends ClientService | DoctorService> {
    protected entityService: T;

    protected jwtService: JwtService;

    protected disabledTokensService: DisabledTokensService;

    constructor(auth: T, jwtService: JwtService) {
        this.entityService = auth;

        this.disabledTokensService = new DisabledTokensService(DisabledTokens);

        this.jwtService = jwtService;
    }

    @Post('/registration')
    public async register(@Body() createDto) {
        const passwordSalt = AuthUtils.generateSalt();

        const encryptedPassword = AuthUtils.cryptPassword(createDto.password, passwordSalt);

        const createdEntity = (
            await this.entityService.create({
                ...createDto,
                password: encryptedPassword,
                password_salt: passwordSalt,
            })
        ).get({ plain: true });

        const token = this.generateToken(
            createdEntity.id,
            createdEntity.login,
            this.entityService instanceof ClientService ? 'CLIENT' : 'DOCTOR'
        );

        const { password, password_salt, ...response } = createdEntity;

        return {
            entity: response,
            token: token,
        };
    }

    @Post('/login')
    public async login(@Body() body: LoginReqBody) {
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

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    public async logout(@Headers() headers: Record<string, any>, @AuthGetter() entity: EntityAuthInfo): Promise<void> {
        const entityId = this.entityService instanceof ClientService ? entity.userId : entity.userId;

        const token = AuthUtils.getTokenFromAuthString(headers.authorization);

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
