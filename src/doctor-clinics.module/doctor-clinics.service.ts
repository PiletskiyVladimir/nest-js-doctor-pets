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
import {TQuerySettings} from "../types";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class DoctorClinicsService implements ICreateService<DoctorClinics, DoctorClinicsDto>, IGetByIdService<DoctorClinics>, IGetAllService<DoctorClinics>, IUpdateService<DoctorClinics, DoctorClinicsDto>, IDeleteService {
    constructor(@InjectModel(DoctorClinics) private doctorClinicsRepository: typeof DoctorClinics) {
    }

    async create(dto: DoctorClinicsDto): Promise<DoctorClinics> {
        let doctorClinicRecord = await this.doctorClinicsRepository.findOne({
            where: {
                doctor_id: dto.doctor_id,
                clinic_id: dto.clinic_id
            }
        });

        if (doctorClinicRecord) throw new HttpException("Such record already exists", 403);

        return await this.doctorClinicsRepository.create(dto);
    }

    async delete(id: number): Promise<null> {
        let doctorClinic = await this.doctorClinicsRepository.findOne({where: {id: id}});

        if (!doctorClinic) throw new HttpException("Doctor clinic record was not found", 404);

        await this.doctorClinicsRepository.destroy({where: {id: id}});

        return null;
    }

    async getAll({
                     offset,
                     limit,
                     sortField,
                     sortType,
                     query,
                     raw = false,
                     attributes = undefined
                 }: TQuerySettings): Promise<DoctorClinics[]> {
        return await this.doctorClinicsRepository.findAll({
            where: query,
            offset: offset,
            limit: limit,
            order: [[sortField, sortType]],
            raw: raw,
            attributes: attributes
        });
    }

    async getById(id: number): Promise<DoctorClinics> {
        let doctorClinic = await this.doctorClinicsRepository.findOne({ where: { id } });

        if (!doctorClinic) throw new HttpException("Doctor clinic record not found", 404);

        return doctorClinic;
    }

    async update(id: number, updateModel: DoctorClinicsDto): Promise<DoctorClinics> {
        let doctorClinic = await this.doctorClinicsRepository.findOne({ where: { id } });

        if (!doctorClinic) throw new HttpException("Doctor clinic not found", 404);

        for (let prop in updateModel) {
            doctorClinic[prop] = updateModel[prop];
        }

        await doctorClinic.save();

        return doctorClinic;
    }
}
