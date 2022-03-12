import {Controller} from '@nestjs/common';
import {
    ICreateMethod,
    IDeleteMethod,
    IGetAllMethod,
    IGetByIdMethod,
    IUpdateMethod
} from "../interfaces/methods.interface";
import {Clinic} from "./clinic.model";

@Controller('clinics')
export class ClinicsController implements IGetAllMethod<Clinic>, IGetByIdMethod<Clinic>, ICreateMethod<Clinic>, IUpdateMethod<Clinic>, IDeleteMethod {
    async create(body: any) {
        return Promise.resolve(undefined);
    }

    async delete(id: number) {
        return Promise.resolve(undefined);
    }

    async getAll(query: { [p: string]: any }) {
        return Promise.resolve(undefined);
    }

    async getById(id: number) {
        return Promise.resolve(undefined);
    }

    async update(id: number, updateBody: any) {
        return Promise.resolve(undefined);
    }
}
