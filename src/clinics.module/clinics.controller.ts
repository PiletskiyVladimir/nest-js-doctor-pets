import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
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
    @Post()
    async create(@Body() body: any) {
        return Promise.resolve(undefined);
    }

    @Delete('/:id')
    async delete(@Param("id") id: number) {
        return Promise.resolve(undefined);
    }

    @Get()
    async getAll(@Query() query) {
        return Promise.resolve(undefined);
    }

    @Get('/:id')
    async getById(@Param("id") id: number) {
        return Promise.resolve(undefined);
    }

    @Patch('/:id')
    async update(@Param("id") id: number, @Body() body: any) {
        return Promise.resolve(undefined);
    }

    @Patch('/:clinicId/assign/:doctorId')
    async assignDoctor(@Param("doctorId") doctorId: number, @Param('clinicId') clinicId: number) {
        return Promise.resolve(undefined);
    }

    @Patch('/:clinicId/dismiss/:doctorId')
    async dismissDoctor(@Param("doctorId") doctorId: number, @Param('clinicId') clinicId: number) {
        return Promise.resolve(undefined);
    }
}
