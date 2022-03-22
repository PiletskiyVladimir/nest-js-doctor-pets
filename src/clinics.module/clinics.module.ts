import {Module} from '@nestjs/common';
import {ClinicsController} from './clinics.controller';
import {ClinicsService} from './clinics.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Clinic} from "./clinic.model";
import {Doctor} from "../doctors.module/doctor.model";
import {DoctorClinics} from "../doctor-clinics.module/doctor-clinics.model";
import {DoctorClinicsService} from "../doctor-clinics.module/doctor-clinics.service";
import {DoctorClinicsModule} from "../doctor-clinics.module/doctor-clinics.module";

// todo return after doctor methods

@Module({
    controllers: [ClinicsController],
    providers: [ClinicsService],
    imports: [
        SequelizeModule.forFeature([Clinic, Doctor, DoctorClinics]),
        DoctorClinicsModule
    ],
    exports: [ClinicsService]
})
export class ClinicsModule {
}
