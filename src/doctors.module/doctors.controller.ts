import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {
    ICreateMethod,
    IDeleteMethod,
    IGetAllMethod,
    IGetByIdMethod,
    IUpdateMethod
} from "../interfaces/methods.interface";
import {Doctor} from "./doctor.model";
import {
    DateField,
    NumberField,
    ValidateError,
    FieldCheck,
    StringField,
    NumberArrField,
    DateArrField, StringArrField
} from "errors-checker";
import {DoctorsService} from "./doctors.service";
import {DoctorDto} from "../dto/doctors/doctor.dto";
import {UpdateUserDto} from "../dto/users/update-user.dto";

@Controller('doctors')
export class DoctorsController implements   ICreateMethod<Doctor>,
                                            IUpdateMethod<Doctor>,
                                            IGetByIdMethod<Doctor>,
                                            IGetAllMethod<Doctor>,
                                            IDeleteMethod {
    constructor(private doctorService: DoctorsService) {
    }

    @Post()
    async create(@Body() body: any): Promise<ValidateError[] | Doctor> {
        let params = [
            new NumberField('user_id', body.user_id, false),
            new DateField('career_start', body.career_start, false),
            new StringField('specialization', body.specialization, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: DoctorDto = {
            specialization: obj.specialization,
            career_start: obj.career_start,
            user_id: obj.user_id
        }

        return this.doctorService.create(dto);
    }

    @Delete('/:id')
    async delete(@Param("id") id: number): Promise<ValidateError[] | null> {
        let params = [
            new NumberField('id', id, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.doctorService.delete(id);
    }

    @Get()
    async getAll(@Query() query): Promise<Doctor[] | ValidateError[]> {
        let params = [
            new NumberArrField('user_id', query.user_id, true),
            new DateArrField('career_start', query.career_start, true),
            new StringArrField('specialization', query.specialization, true)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let limit = +query.limit || 100,
            offset = +query.offset || 0;

        let sortField = query.sortField || 'id',
            sortType = query.sortType || 'asc';

        return await this.doctorService.getAll({offset, limit, sortField, sortType, query: obj});
    }

    @Get('/:id')
    async getById(@Param("id") id: number): Promise<ValidateError[] | Doctor> {
        let params = [
            new NumberField('id', id, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.doctorService.getById(id);
    }

    @Patch('/:id')
    async update(@Param("id") id: number, @Body() body: any): Promise<ValidateError[] | Doctor> {
        let params = [
            new DateArrField('career_start', body.career_start, true),
            new StringArrField('specialization', body.specialization, true)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: DoctorDto = {
            specialization: obj.specialization,
            career_start: obj.career_start
        }

        return this.doctorService.update(id, dto);
    }
}
