import { HttpException, Injectable } from '@nestjs/common';
import { TQuerySettings } from './types/query';
import { Model, ModelCtor } from 'sequelize-typescript';
import { CreationAttributes, WhereOptions } from 'sequelize';

@Injectable()
export default class MainService<MODEL extends Model> {
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
    }: TQuerySettings<MODEL>): Promise<{
        result: Array<MODEL>;
        totalCount: number;
    }> {
        const promiseAllArr: [Promise<MODEL[]>, Promise<number>] = [
            this.repository.findAll({
                where: query,
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

    public async getEntity(search: WhereOptions<MODEL>): Promise<MODEL> {
        return await this.repository.findOne({ where: search });
    }

    public async create(dto: CreationAttributes<MODEL>): Promise<MODEL> {
        return await this.repository.create(dto);
    }

    public async updateMany(search: WhereOptions<MODEL>, updateModel: Partial<MODEL>): Promise<MODEL[]> {
        await this.repository.update(updateModel, { where: search });

        return await this.repository.findAll({ where: <WhereOptions<MODEL>>search });
    }

    public async updateById(id: number, updateModel: Partial<MODEL>): Promise<MODEL> {
        await this.repository.update(updateModel, { where: { id } });

        return await this.repository.findOne({ where: { id } });
    }

    public async delete(search: WhereOptions<MODEL>): Promise<void> {
        const entity = await this.repository.findOne({ where: search });

        if (!entity) throw new HttpException('Entity not found', 404);

        await this.repository.destroy({ where: <WhereOptions<MODEL>>search });
    }

    public async count(query: WhereOptions<MODEL>): Promise<number> {
        return await this.repository.count({
            where: query,
        });
    }

    public async exists(query: WhereOptions<MODEL>): Promise<boolean> {
        return (await this.count(query)) > 0;
    }
}
