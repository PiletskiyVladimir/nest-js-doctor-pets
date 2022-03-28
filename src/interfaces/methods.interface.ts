import { ValidateError } from "errors-checker/index";
import { TLoginResponse } from "../types";

export interface IGetAllMethod<T> {
    getAll(query: {[prop: string]: any}): Promise<T[] | ValidateError[]>;
}

export interface IGetByIdMethod<T> {
    getById(id: number): Promise<T | ValidateError[]>;
}

export interface ICreateMethod<T> {
    create(body: any): Promise<T | ValidateError[]>;
}

export interface IUpdateMethod<T> {
    update(id: number, updateBody: any): Promise<T | ValidateError[]>;
}

export interface IDeleteMethod {
    delete(id: number): Promise<null | ValidateError[]>;
}

export interface ILoginMethod {
    login(body:any): Promise<TLoginResponse | ValidateError[]>
}

export interface IRegistrationMethod<T> {
    registration(body: any): Promise<T | ValidateError[]>
}

export interface ILogoutMethod {
    logout(body: any): Promise<null>
}