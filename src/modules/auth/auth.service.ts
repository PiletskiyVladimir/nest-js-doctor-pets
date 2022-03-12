import { HttpException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ILoginService, ILogoutService, IRegistrationService } from "../../interfaces/services.interface";
import { User } from "../users/user.model";
import { RegisterUserDto } from "../../dto/users/register-user.dto";
import { LoginUserDto } from "../../dto/users/login-user.dto";
import { Utils } from "../../utils/utils.class";
import { TLoginResponse } from "../../types";
import { CreateUserDto } from "../../dto/users/create-user.dto";
import { SessionsService } from "../sessions/sessions.service";
import { CreateSessionDto } from "../../dto/sessions/create-session.dto";
import {Md5} from "md5-typescript";

@Injectable()
export class AuthService implements ILoginService, IRegistrationService<User>, ILogoutService {
    constructor(private userService: UsersService,
                private sessionService: SessionsService) {}

    async login(loginUserDto: LoginUserDto): Promise<TLoginResponse> {
        let user = await this.userService.getUserByLogin(loginUserDto.login);

        if (!user) throw new HttpException("User not found", 404);

        let isPasswordEqual = Utils.comparePasswordWithPasswordInDB(loginUserDto.password, user.password_salt, user.password);

        if (!isPasswordEqual) throw new HttpException("Wrong user password", 401);

        let token = Utils.generateToken();

        let sessionDto: CreateSessionDto = {
            token: token,
            user_id: user.id
        }

        await this.sessionService.create(sessionDto);

        return {
            id: user.id,
            token: token
        };
    }

    async logout(token: string): Promise<null> {
        let session = await this.sessionService.getByValue(token);

        if (!session) throw new HttpException("Session not found", 404);

        await this.sessionService.delete(session.id);

        return null;
    }

    async registration(registerUserDto: RegisterUserDto): Promise<User> {
        let userWithSameLogin = await this.userService.getUserByLogin(registerUserDto.login);

        if (userWithSameLogin) throw new HttpException("User with such login already exists", 403);

        let passwordSalt = Utils.generateSalt();

        let password = Md5.init(registerUserDto.password + passwordSalt);

        let createUserDto: CreateUserDto = {
            ...registerUserDto,
            password: password,
            password_salt: passwordSalt
        }

        return await this.userService.create(createUserDto);
    }
}
