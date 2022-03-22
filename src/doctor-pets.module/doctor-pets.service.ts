import {HttpException, Injectable} from '@nestjs/common';
import {
    ICreateService,
    IDeleteService,
    IGetAllService,
    IGetByIdService,
    IUpdateService
} from "../interfaces/services.interface";
import {DoctorPets} from "./doctor-pets.model";
import {DoctorPetsDto} from "../dto/doctor-pets/doctor-pets.dto";
import {TQuerySettings} from "../types";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users.module/user.model";

@Injectable()
export class DoctorPetsService implements ICreateService<DoctorPets, DoctorPetsDto>, IGetByIdService<DoctorPets>, IGetAllService<DoctorPets>, IUpdateService<DoctorPets, DoctorPets>, IDeleteService {
    constructor(@InjectModel(DoctorPets) private doctorPetsRepository: typeof DoctorPets) {
    }

    async create(dto: DoctorPets): Promise<DoctorPets> {
        let doctorPetRecord = await this.doctorPetsRepository.findOne({
            where: {
                doctor_id: dto.doctor_id,
                pet_id: dto.pet_id
            }
        });

        if (doctorPetRecord) throw new HttpException("Such record already exists", 403);

        return await this.doctorPetsRepository.create(dto);
    }

    async delete(id: number): Promise<null> {
        let doctorClinic = await this.doctorPetsRepository.findOne({where: {id: id}});

        if (!doctorClinic) throw new HttpException("Doctor clinic record was not found", 404);

        await this.doctorPetsRepository.destroy({where: {id: id}});

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
                 }: TQuerySettings): Promise<DoctorPets[]> {
        return await this.doctorPetsRepository.findAll({
            where: query,
            offset: offset,
            limit: limit,
            order: [[sortField, sortType]],
            raw: raw,
            attributes: attributes
        });
    }

    async getById(id: number): Promise<DoctorPets> {
        let doctorClinic = await this.doctorPetsRepository.findOne({ where: { id } });

        if (!doctorClinic) throw new HttpException("Doctor clinic record not found", 404);

        return doctorClinic;
    }

    async update(id: number, updateModel: DoctorPetsDto): Promise<DoctorPets> {
        let doctorClinic = await this.doctorPetsRepository.findOne({ where: { id } });

        if (!doctorClinic) throw new HttpException("Doctor clinic not found", 404);

        for (let prop in updateModel) {
            doctorClinic[prop] = updateModel[prop];
        }

        await doctorClinic.save();

        return doctorClinic;
    }
}