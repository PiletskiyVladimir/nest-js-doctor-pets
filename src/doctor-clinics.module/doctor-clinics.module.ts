import { Module } from '@nestjs/common';
import {DoctorClinicsService} from "./doctor-clinics.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {DoctorClinics} from "./doctor-clinics.model";

@Module({
    controllers: [],
    providers: [DoctorClinicsService],
    imports: [
        SequelizeModule.forFeature([DoctorClinics])
    ],
    exports: [DoctorClinicsService]
})
export class DoctorClinicsModule {}
