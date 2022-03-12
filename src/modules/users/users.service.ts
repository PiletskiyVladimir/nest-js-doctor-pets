import { HttpException, Injectable } from "@nestjs/common";
import {
    IDeleteService,
    IGetAllService,
    IGetByIdService,
    IUpdateService,
    ICreateService
} from "../../interfaces/services.interface";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateUserDto } from "../../dto/users/update-user.dto";
import { RegisterUserDto } from "../../dto/users/register-user.dto";
import { TQuerySettings } from "../../types";
import { CreateUserDto } from "../../dto/users/create-user.dto";

@Injectable()
export class UsersService implements IGetAllService<User>, IGetByIdService<User>, IUpdateService<User, UpdateUserDto>, IDeleteService, ICreateService<User, RegisterUserDto> {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async delete(id: number): Promise<null> {
        let user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new HttpException("User not found", 404);

        await this.userRepository.destroy({ where: { id } });

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
                 }: TQuerySettings): Promise<User[]> {
        return await this.userRepository.findAll({
            where: query,
            offset: offset,
            limit: limit,
            order: [[sortField, sortType]],
            raw: raw,
            attributes: attributes
        });
    }

    async getById(id: number): Promise<User> {
        let user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new HttpException("User not found", 404);

        return user;
    }

    async create(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(dto);
    }

    async update(id: number, updateModel: UpdateUserDto): Promise<User> {
        let user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new HttpException("User not found", 404);

        for (let prop in updateModel) {
            user[prop] = updateModel[prop];
        }

        await user.save();

        return user;
    }

    async getUserByLogin(login: string) {
        return await this.userRepository.findOne({
            where: {
                login: login
            },
            raw: true
        })
    }
}
