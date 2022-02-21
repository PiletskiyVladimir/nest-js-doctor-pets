import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { ICommonServices, TQuerySettings } from "../interfaces/services.interface";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UsersService implements ICommonServices<User, CreateUserDto> {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async create(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(dto);
    }

    async delete(id: number): Promise<null> {
        await this.userRepository.destroy({ where: { id } });

        return null;
    }

    async getAll({ offset, limit, sortField, sortType, query }: TQuerySettings): Promise<User[]> {
        return await this.userRepository.findAll({
            where: query,
            offset: offset,
            limit: limit,
            order: [[sortField, sortType]]
        });
    }

    async getById(id: number): Promise<User> {
        let user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new HttpException(null, 404);

        return user;
    }

    async update(id: number, updateModel: User): Promise<User> {
        let user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new HttpException(null, 404);

        for (let prop in updateModel) {
            user[prop] = updateModel[prop];
        }

        await user.save();

        return user;
    }
}
