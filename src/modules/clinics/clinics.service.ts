import { Injectable } from '@nestjs/common';
import {
    ICreateService,
    IDeleteService,
    IGetAllService,
    IGetByIdService,
    IUpdateService
} from "../../interfaces/services.interface";
import {Clinic} from "./clinic.model";
import {CreateClinicDto} from "../../dto/clinics/create-clinic.dto";
import {TQuerySettings} from "../../types";

@Injectable()
export class ClinicsService implements IGetAllService<Clinic>, IGetByIdService<Clinic>, ICreateService<Clinic, CreateClinicDto>, IUpdateService<Clinic>, IDeleteService {
    async create(dto: CreateClinicDto): Promise<Clinic> {
        return Promise.resolve(undefined);
    }

    async delete(id: number): Promise<null> {
        return Promise.resolve(null);
    }

    async getAll(querySettings: TQuerySettings): Promise<Clinic[]> {
        return Promise.resolve([]);
    }

    async getById(id: number): Promise<Clinic> {
        return Promise.resolve(undefined);
    }

    async update(id: number, updateModel: Clinic): Promise<Clinic> {
        return Promise.resolve(undefined);
    }
}
