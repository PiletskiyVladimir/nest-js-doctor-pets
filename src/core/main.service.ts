import { HttpException, Injectable } from '@nestjs/common';
import { TQuerySettings } from './types';
import { Model, ModelCtor } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize';

@Injectable()
export default class MainService<MODEL extends Model, CREATE_DTO, UPDATE_DTO> {
    private readonly repository: ModelCtor<MODEL>;

    constructor(repository) {
        this.repository = repository;
    }

    public async getAll({
        offset,
        limit,
        sortField,
        sortType,
        query,
        raw = false,
        attributes = undefined,
    }: TQuerySettings): Promise<{
        result: Array<MODEL>;
        totalCount: number;
    }> {
        const promiseAllArr: [Promise<MODEL[]>, Promise<number>] = [
            this.repository.findAll({
                where: <WhereOptions<MODEL>>query,
                offset: offset,
                limit: limit,
                order: [[sortField, sortType]],
                raw: raw,
                attributes: attributes,
            }),
            this.repository.count({
                where: <WhereOptions<MODEL>>query,
            }),
        ];

        const [result, totalCount] = await Promise.all(promiseAllArr);

        return {
            result: result,
            totalCount: totalCount,
        };
    }

    public async getEntity(search: Record<string, any>): Promise<MODEL> {
        const entity = await this.repository.findOne({ where: <WhereOptions<MODEL>>search });

        if (!entity) throw new HttpException('Entity not found', 404);

        return entity;
    }

    public async create(dto: CREATE_DTO): Promise<MODEL> {
        return await this.repository.create(dto);
    }

    public async updateMany(search: Record<string, any>, updateModel: UPDATE_DTO): Promise<MODEL[]> {
        await this.repository.update(updateModel, { where: <WhereOptions<MODEL>>search });

        return await this.repository.findAll({ where: <WhereOptions<MODEL>>search });
    }

    public async updateById(id: number, updateModel: UPDATE_DTO): Promise<MODEL> {
        await this.repository.update(updateModel, { where: { id } });

        return await this.repository.findOne({ where: { id } });
    }

    public async delete(search: Record<string, any>): Promise<void> {
        const entity = await this.repository.findOne({ where: <WhereOptions<MODEL>>search });

        if (!entity) throw new HttpException('Entity not found', 404);

        await this.repository.destroy({ where: <WhereOptions<MODEL>>search });
    }

    public async count(query: Record<string, any>): Promise<number> {
        return await this.repository.count({
            where: <WhereOptions<MODEL>>query,
        });
    }

    public async exists(query: Record<string, any>): Promise<boolean> {
        return (await this.count(query)) > 0;
    }
}
