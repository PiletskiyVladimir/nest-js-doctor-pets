import { ValidateError } from "errors-checker/index";
import { TLoginResponse } from "../types";

export interface IGetAllMethod<T> {
    getAll(query: {[prop: string]: any}): Promise<T[]> | Promise<ValidateError[]>;
}

export interface IGetByIdMethod<T> {
    getById(id: number): Promise<T> | Promise<ValidateError[]>;
}

export interface ICreateMethod<T> {
    create(body: any): Promise<T> | Promise<ValidateError[]>;
}

export interface IUpdateMethod<T> {
    update(id: number, updateBody: any): Promise<T> | Promise<ValidateError[]>;
}

export interface IDeleteMethod {
    delete(id: number): Promise<null> | Promise<ValidateError[]>;
}

export interface ILoginMethod {
    login(body:any): Promise<TLoginResponse> | Promise<ValidateError[]>
}

export interface IRegistrationMethod<T> {
    registration(body: any): Promise<T> | Promise<ValidateError[]>
}

export interface ILogoutMethod {
    logout(body: any): Promise<null>
}