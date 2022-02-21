import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { ICommonServices, TQuerySettings } from "../interfaces/services.interface";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService implements ICommonServices<User, CreateUserDto> {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async create(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(dto);
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

    async update(id: number, updateModel: UpdateUserDto): Promise<User> {
        let user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new HttpException("User not found", 404);

        for (let prop in updateModel) {
            user[prop] = updateModel[prop];
        }

        await user.save();

        return user;
    }
}
