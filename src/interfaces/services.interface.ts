import { LoginUserDto } from "../dto/users/login-user.dto";
import { TLoginResponse, TQuerySettings } from "../types";
import { RegisterUserDto } from "../dto/users/register-user.dto";

export interface IGetAllService<T> {
    getAll(querySettings: TQuerySettings): Promise<T[]>;
}

export interface IGetByIdService<T> {
    getById(id: number): Promise<T>;
}

export interface IGetByValueService<T> {
    getByValue(value: string): Promise<T>
}

export interface ICreateService<T, DTO> {
    create(dto: DTO): Promise<T>;
}

export interface IUpdateService<T> {
    update(id: number, updateModel: T): Promise<T>;
}

export interface IDeleteService {
    delete(id: number): Promise<null>;
}

export interface ILoginService {
    login(loginUserDto: LoginUserDto): Promise<TLoginResponse>
}

export interface ILogoutService {
    logout(session: string): Promise<null>
}

export interface IRegistrationService<T> {
    registration(registerUserDto: RegisterUserDto): Promise<T>
}