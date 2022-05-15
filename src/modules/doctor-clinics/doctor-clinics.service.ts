import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { DoctorClinics } from './doctor-clinics.model';
import { DoctorClinicDto } from './dto/doctor-clinic.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DoctorClinicsService extends MainService<DoctorClinics, DoctorClinicDto, DoctorClinicDto> {
    constructor(@InjectModel(DoctorClinics) private doctorClinicRepository: typeof DoctorClinics) {
        super(doctorClinicRepository);
    }
}
