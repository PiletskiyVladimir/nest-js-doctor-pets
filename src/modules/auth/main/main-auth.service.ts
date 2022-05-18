import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../../client/client.service';
import { DoctorService } from '../../doctor/doctor.service';
import { Utils } from 'sequelize';
import { AuthUtils } from '../../../utils/auth.utils';

@Injectable()
export class MainAuthService {
    private entityService: ClientService | DoctorService;

    constructor(entityService: ClientService | DoctorService, private jwtService: JwtService) {
        this.entityService = entityService;
    }

    // логаут регистрация и проверка на подлинность пароля одинаковая и для клиента и для врача, а логин нужно сделать разным, потому что при логине будут задействованы разные поля в токене, у юзера client_id, у доктора - doctor_id. Поэтому у всех методов тип protected так как от этого класса будут наследованы классы логина доктора и клиента

    protected async logout() {}

    protected async register() {}

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
