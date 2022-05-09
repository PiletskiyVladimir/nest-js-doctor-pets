import {HttpException, Injectable} from '@nestjs/common';
import {DoctorPets} from "./doctor-pets.model";
import {DoctorPetsDto} from "../dto/doctor-pets/doctor-pets.dto";
import {InjectModel} from "@nestjs/sequelize";
import MainService from "../core/main.service";

@Injectable()
export class DoctorPetsService extends MainService<DoctorPets, DoctorPetsDto, DoctorPetsDto> {
    constructor(@InjectModel(DoctorPets) private doctorPetsRepository: typeof DoctorPets) {
        super(doctorPetsRepository);
    }
}