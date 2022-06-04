import { HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../../client/client.service';
import { DoctorService } from '../../doctor/doctor.service';
import { AuthUtils } from '../../../utils/auth.utils';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { CreateDoctorDto } from '../../doctor/dto/create-doctor.dto';
import { EntityAuthInfo } from '../../../core/types/auth';
import { DisabledTokensService } from '../../disabled-tokens/disabled-tokens.service';
import { DisabledTokens } from '../../disabled-tokens/disabled-tokens.model';
import { AuthPayload } from './main-auth.constant';

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

    private disabledTokensService: DisabledTokensService;

    constructor(auth: T, jwtService: JwtService) {
        this.entityService = auth.service;
        this.dto = auth.dto;

        this.disabledTokensService = new DisabledTokensService(DisabledTokens);

        this.jwtService = jwtService;
    }

    // Лог аут регистрация и проверка на подлинность пароля одинаковая и для клиента и для врача, а логин нужно сделать разным, потому что при логине будут задействованы разные поля в токене, у юзера client_id, у доктора - doctor_id. Поэтому у всех методов тип protected так как от этого класса будут наследованы классы логина доктора и клиента

    protected async logout(token: string, entityId: number): Promise<void> {
        await this.disabledTokensService.create({
            token: token,
            entity_id: entityId,
        });

        return;
    }

    protected verifyToken(token: string): EntityAuthInfo {
        try {
            return this.jwtService.verify(token) as EntityAuthInfo;
        } catch (e) {
            throw new UnauthorizedException({ message: 'User is unauthorized' });
        }
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

    @Post()
    protected async register(createDto: T['dto']) {
        const createdEntity = await this.entityService.create(createDto);

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

    protected async validateUser(login: string, password: string) {
        const entity = await this.entityService.getEntity({ login });

        if (!entity) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const isPasswordEqual = AuthUtils.comparePasswordWithPasswordInDB(
            password,
            entity.password_salt,
            entity.password
        );

        if (!isPasswordEqual) throw new HttpException('Wrong user password', HttpStatus.UNAUTHORIZED);

        return entity;
    }
}
