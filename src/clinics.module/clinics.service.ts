import {HttpException, Injectable} from '@nestjs/common';
import {
    ICreateService,
    IDeleteService,
    IGetAllService,
    IGetByIdService,
    IUpdateService
} from "../interfaces/services.interface";
import {Clinic} from "./clinic.model";
import {ClinicDto} from "../dto/clinics/clinic.dto";
import {TQuerySettings} from "../types";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class ClinicsService implements IGetAllService<Clinic>, IGetByIdService<Clinic>, ICreateService<Clinic, ClinicDto>, IUpdateService<Clinic, ClinicDto>, IDeleteService {
    constructor(@InjectModel(Clinic) private clinicsRepository: typeof Clinic) {
    }

    async create(dto: ClinicDto): Promise<Clinic> {
        let clinicWithSameNameAndAddress = await this.clinicsRepository.findOne({
            where: {
                address: dto.address,
                name: dto.name
            }
        });

        if (clinicWithSameNameAndAddress) throw new HttpException("Clinic with same name and address already exists", 403);

        return await this.clinicsRepository.create(dto);
    }

    async delete(id: number): Promise<null> {
        let clinic = await this.clinicsRepository.findOne({where: {id}});

        if (!clinic) throw new HttpException("Clinic was not found", 404);

        await this.clinicsRepository.destroy({where: {id}});

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
                 }: TQuerySettings): Promise<Clinic[]> {
        return await this.clinicsRepository.findAll({
            where: query,
            offset: offset,
            limit: limit,
            order: [[sortField, sortType]],
            raw: raw,
            attributes: attributes
        });
    }

    async getById(id: number): Promise<Clinic> {
        let clinic = await this.clinicsRepository.findOne({ where: { id } });

        if (!clinic) throw new HttpException("Clinic record not found", 404);

        return clinic;
    }

    async update(id: number, updateModel: ClinicDto): Promise<Clinic> {
        let clinic = await this.clinicsRepository.findOne({ where: { id } });

        if (!clinic) throw new HttpException("Doctor clinic not found", 404);

        for (let prop in updateModel) {
            clinic[prop] = updateModel[prop];
        }

        await clinic.save();

        return clinic;
    }

    async assignDoctor(doctorId: number, clinicId: number) {
        let doctor = await this.clinicsRepository.findOne({
            where: {
                id: doctorId
            }
        })

        if (!doctor) throw new HttpException("Doctor not found", 404);

        // let clinic = await th
    }

    async dismissDoctor(doctorId: number, clinicId: number) {

    }
}
