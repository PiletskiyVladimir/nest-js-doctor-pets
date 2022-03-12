import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Field, FieldsCheckOutput } from "errors-checker";
import { RegisterUserDto } from "../../dto/users/register-user.dto";
import { ILoginMethod, IRegistrationMethod, ILogoutMethod } from "../../interfaces/methods.interface";
import { User } from "../users/user.model";
import { LoginUserDto } from "../../dto/users/login-user.dto";

@Controller("auth")
export class AuthController implements ILoginMethod, IRegistrationMethod<User>, ILogoutMethod {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    async login(@Body() body: any) {
        let params = [
            new Field('login', body.login, 'string', false),
            new Field('password', body.password, 'string', false)
        ];

        let {errors, obj} = new FieldsCheckOutput(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: LoginUserDto = {
            login: body.login,
            password: body.password
        }

        return await this.authService.login(dto);
    }

    @Post('/logout')
    async logout(@Body() body: any) {
        let params = [
            new Field('token', body.token, 'string', false)
        ];

        let {errors, obj} = new FieldsCheckOutput(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return await this.authService.logout(body.token);
    }

    @Post('/register')
    async registration(@Body() body: any) {
        let params = [
            new Field('login', body.login, 'string', false),
            new Field('password', body.password, 'string', false),
            new Field('name', body.name, 'string', false),
            new Field('surname', body.surname, 'string', false)
        ];

        let {errors, obj} = new FieldsCheckOutput(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: RegisterUserDto = {
            name: obj.name,
            surname: obj.surname,
            login: obj.login,
            password: obj.password
        }

        return await this.authService.registration(dto);
    }
}
