import {HttpException, Injectable} from '@nestjs/common';
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

    async create(dto: DoctorDto): Promise<Doctor> {
        let doctorWithSameUserId = await this.doctorRepository.findOne({where: {user_id: dto.user_id}});

        if (doctorWithSameUserId) throw new HttpException("Doctor with such user id already exists", 403);

        return await this.doctorRepository.create(dto);
    }

    async delete(id: number): Promise<null> {
        let doctor = await this.doctorRepository.findOne({where: {id}});

        if (!doctor) throw new HttpException("Doctor not found", 404);

        await this.doctorRepository.destroy({where: {id}})

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
                 }: TQuerySettings): Promise<Doctor[]> {
        return await this.doctorRepository.findAll({
            where: query,
            offset: offset,
            limit: limit,
            order: [[sortField, sortType]],
            raw: raw,
            attributes: attributes
        });
    }

    async getById(id: number): Promise<Doctor> {
        let doctor = await this.doctorRepository.findOne({ where: { id } });

        if (!doctor) throw new HttpException("Doctor not found", 404);

        return doctor;
    }

    async update(id: number, updateModel: DoctorDto): Promise<Doctor> {
        let doctor = await this.doctorRepository.findOne({ where: { id } });

        if (!doctor) throw new HttpException("Doctor not found", 404);

        for (let prop in updateModel) {
            doctor[prop] = updateModel[prop];
        }

        await doctor.save();

        return doctor;
    }
}
