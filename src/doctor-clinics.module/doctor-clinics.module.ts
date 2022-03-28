import { Module } from '@nestjs/common';
import {DoctorClinicsService} from "./doctor-clinics.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {DoctorClinics} from "./doctor-clinics.model";
import {Doctor} from "../doctors.module/doctor.model";
import {Clinic} from "../clinics.module/clinic.model";

@Module({
    controllers: [],
    providers: [DoctorClinicsService],
    imports: [
        SequelizeModule.forFeature([DoctorClinics, Clinic, Doctor])
    ],
    exports: [DoctorClinicsService]
})
export class DoctorClinicsModule {}
