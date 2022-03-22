import {Body, Controller, Param, Query} from '@nestjs/common';
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
    async create(@Body() body: any) {
        return Promise.resolve(undefined);
    }

    async delete(@Param("id") id: number) {
        return Promise.resolve(undefined);
    }

    async getAll(@Query() query) {
        return Promise.resolve(undefined);
    }

    async getById(@Param("id") id: number) {
        return Promise.resolve(undefined);
    }

    async update(@Param("id") id: number, @Body() body: any) {
        return Promise.resolve(undefined);
    }

    async assignDoctor(@Param("id") id: number) {
        return Promise.resolve(undefined);
    }

    async dismissDoctor(@Param("id") id: number) {
        return Promise.resolve(undefined);
    }
}
