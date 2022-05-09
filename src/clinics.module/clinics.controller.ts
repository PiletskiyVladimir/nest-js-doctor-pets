import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {
    ICreateMethod,
    IDeleteMethod,
    IGetAllMethod,
    IGetByIdMethod,
    IUpdateMethod
} from "../interfaces/methods.interface";
import {Clinic} from "./clinic.model";
import {FieldCheck, NumberField, StringField} from "errors-checker";
import {ClinicDto} from "../dto/clinics/clinic.dto";
import {ClinicsService} from "./clinics.service";

@Controller('clinics')
export class ClinicsController {
    constructor(private clinicService: ClinicsService) {
    }

    @Post()
    async create(@Body() body: any) {
        let params = [
            new StringField('address', body.address, false),
            new StringField('name', body.name, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: ClinicDto = {
            name: obj.name,
            address: obj.address
        }

        return this.clinicService.create(dto);
    }

    @Delete('/:id')
    async delete(@Param("id") id: number) {
        let params = [
            new NumberField('id', id, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.clinicService.delete(id);
    }

    @Get()
    async getAll(@Query() query) {
        let params = [
            new NumberField('id', query.id, true),
            new StringField('address', query.address, true),
            new StringField('name', query.name, true)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let limit = +query.limit || 100,
            offset = +query.offset || 0;

        let sortField = query.sortField || 'id',
            sortType = query.sortType || 'asc';

        return await this.clinicService.getAll({offset, limit, sortField, sortType, query: obj});
    }

    @Get('/:id')
    async getById(@Param("id") id: number) {
        let params = [
            new NumberField('id', id, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.clinicService.getEntity(id);
    }

    @Patch('/:id')
    async update(@Param("id") id: number, @Body() body: any) {
        let params = [
            new StringField('name', body.name, true),
            new StringField('address', body.address, true)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: ClinicDto = {
            name: obj.name,
            address: obj.address
        }

        return this.clinicService.update(id, dto);
    }

    @Patch('/:clinicId/assign/:doctorId')
    async assignDoctor(@Param("doctorId") doctorId: number, @Param('clinicId') clinicId: number) {
        let params = [
            new NumberField('doctorId', doctorId, false),
            new NumberField('clinicId', clinicId, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.clinicService.assignDoctor(doctorId, clinicId)
    }

    @Patch('/:clinicId/dismiss/:doctorId')
    async dismissDoctor(@Param("doctorId") doctorId: number, @Param('clinicId') clinicId: number) {
        let params = [
            new NumberField('doctorId', doctorId, false),
            new NumberField('clinicId', clinicId, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.clinicService.dismissDoctor(doctorId, clinicId)
    }
}
