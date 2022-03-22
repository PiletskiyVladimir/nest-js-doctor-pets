import { Controller } from '@nestjs/common';
import {
    ICreateMethod,
    IDeleteMethod,
    IGetAllMethod,
    IGetByIdMethod,
    IUpdateMethod
} from "../interfaces/methods.interface";
import {Doctor} from "./doctor.model";
import {ValidateError} from "errors-checker";
import {DoctorsService} from "./doctors.service";

@Controller('doctors')
export class DoctorsController implements   ICreateMethod<Doctor>,
                                            IUpdateMethod<Doctor>,
                                            IGetByIdMethod<Doctor>,
                                            IGetAllMethod<Doctor>,
                                            IDeleteMethod {
    constructor(private doctorService: DoctorsService) {
    }

    create(body: any): Promise<Doctor> | Promise<ValidateError[]> {
        return Promise.resolve(undefined);
    }

    delete(id: number): Promise<null> | Promise<ValidateError[]> {
        return Promise.resolve(undefined);
    }

    getAll(query: { [p: string]: any }): Promise<Doctor[]> | Promise<ValidateError[]> {
        return Promise.resolve(undefined);
    }

    getById(id: number): Promise<Doctor> | Promise<ValidateError[]> {
        return Promise.resolve(undefined);
    }

    update(id: number, updateBody: any): Promise<Doctor> | Promise<ValidateError[]> {
        return Promise.resolve(undefined);
    }

}
