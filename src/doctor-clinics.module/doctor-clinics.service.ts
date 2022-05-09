import {HttpException, Injectable} from '@nestjs/common';
import {
    ICreateService,
    IDeleteService,
    IGetAllService,
    IGetByIdService,
    IUpdateService
} from "../interfaces/services.interface";
import {DoctorClinics} from "./doctor-clinics.model";
import {DoctorClinicsDto} from "../dto/doctor-clinics/doctor-clinics.dto";
import {TQuerySettings} from "../core/types";
import {InjectModel} from "@nestjs/sequelize";
import {Doctor} from "../doctors.module/doctor.model";
import {Clinic} from "../clinics.module/clinic.model";
import MainService from "../core/main.service";

@Injectable()
export class DoctorClinicsService extends MainService<DoctorClinics, DoctorClinicsDto, DoctorClinicsDto>{
    constructor(@InjectModel(DoctorClinics) private doctorClinicsRepository: typeof DoctorClinics,
                @InjectModel(Doctor) private doctorRepository: typeof Doctor,
                @InjectModel(Clinic) private clinicRepository: typeof Clinic) {
        super(DoctorClinics);
    }

    async deleteByDoctorAndClinicId(doctorId: number, clinicId: number) {
        let doctorClinic = await this.doctorClinicsRepository.findOne({
            where: {
                clinic_id: clinicId,
                doctor_id: doctorId
            }
        });

        if (!doctorClinic) throw new HttpException("Doctor clinic record was not found", 404);

        let doctor = await this.doctorRepository.findOne({
            where: {
                id: doctorClinic.doctor_id
            }
        });

        if (!doctor) throw new HttpException("Doctor not found", 404);

        let clinic = await this.doctorRepository.findOne({
            where: {
                id: doctorClinic.clinic_id
            }
        })

        if (!clinic) throw new HttpException("Clinic not found", 404);

        await this.doctorClinicsRepository.destroy({where: {id: doctorClinic.id}});

        return null;
    }
}
