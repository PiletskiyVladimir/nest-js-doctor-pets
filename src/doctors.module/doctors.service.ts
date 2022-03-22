import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Doctor} from "./doctor.model";
import {
    ICreateService,
    IDeleteService,
    IGetAllService,
    IGetByIdService,
    IUpdateService
} from "../interfaces/services.interface";
import {DoctorDto} from "../dto/doctors/doctor.dto";
import {TQuerySettings} from "../types";

@Injectable()
export class DoctorsService implements  ICreateService<Doctor, DoctorDto>,
                                        IGetAllService<Doctor>,
                                        IGetByIdService<Doctor>,
                                        IUpdateService<Doctor, DoctorDto>,
                                        IDeleteService {
    constructor(@InjectModel(Doctor) private doctorRepository: typeof Doctor) {
    }

    create(dto: DoctorDto): Promise<Doctor> {
        return Promise.resolve(undefined);
    }

    delete(id: number): Promise<null> {
        return Promise.resolve(null);
    }

    getAll(querySettings: TQuerySettings): Promise<Doctor[]> {
        return Promise.resolve([]);
    }

    getById(id: number): Promise<Doctor> {
        return Promise.resolve(undefined);
    }

    update(id: number, updateModel: DoctorDto): Promise<Doctor> {
        return Promise.resolve(undefined);
    }


}
