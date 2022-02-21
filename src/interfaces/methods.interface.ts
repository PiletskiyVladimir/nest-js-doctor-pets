import { ValidateError } from "errors-checker/index";

export interface ICommonMethods<T> {
    getAll(query: {[prop: string]: any}): Promise<T[]> | Promise<ValidateError[]>;
    getById(id: number): Promise<T> | Promise<ValidateError[]>;
    create(body: any): Promise<T> | Promise<ValidateError[]>;
    update(id: number, updateBody: any): Promise<T> | Promise<ValidateError[]>;
    delete(id: number): Promise<any> | Promise<ValidateError[]>;
}