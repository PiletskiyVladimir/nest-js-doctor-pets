import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Session } from "./session.model";
import { ICreateService, IDeleteService, IGetByIdService, IGetByValueService } from "../../interfaces/services.interface";
import { CreateSessionDto } from "../../dto/sessions/create-session.dto";

@Injectable()
export class SessionsService implements IGetByIdService<Session>, ICreateService<Session, CreateSessionDto>, IDeleteService, IGetByValueService<Session> {
    constructor(@InjectModel(Session) private sessionRepository: typeof Session) {
    }

    async create(dto: CreateSessionDto): Promise<Session> {
        return await this.sessionRepository.create(dto);
    }

    async delete(id: number): Promise<null> {
        await this.sessionRepository.destroy({ where: { id } });

        return null;
    }

    async getById(id: number): Promise<Session> {
        return await this.sessionRepository.findOne({ where: { id } });
    }

    async getByValue(value: string): Promise<Session> {
        return await this.sessionRepository.findOne({ where: { token: value } });
    }
}