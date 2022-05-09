import {HttpException, Injectable} from '@nestjs/common';
import {Clinic} from "./clinic.model";
import {ClinicDto} from "../dto/clinics/clinic.dto";
import {TQuerySettings} from "../core/types";
import {InjectModel} from "@nestjs/sequelize";
import {DoctorClinicsService} from "../doctor-clinics.module/doctor-clinics.service";
import {DoctorClinics} from "../doctor-clinics.module/doctor-clinics.model";
import MainService from "../core/main.service";

@Injectable()
export class ClinicsService extends MainService<Clinic, ClinicDto, ClinicDto>{
    constructor(
        @InjectModel(Clinic) private clinicsRepository: typeof Clinic,
        private doctorClinicsService: DoctorClinicsService
    ) {
        super(clinicsRepository);
    }

    async assignDoctor(doctorId: number, clinicId: number): Promise<DoctorClinics> {
        return this.doctorClinicsService.create({
            doctor_id: doctorId, clinic_id: clinicId
        })
    }

    async dismissDoctor(doctorId: number, clinicId: number): Promise<null> {
        return this.doctorClinicsService.deleteByDoctorAndClinicId(doctorId, clinicId)
    }
}
