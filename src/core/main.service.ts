import {HttpException, Injectable} from "@nestjs/common";
import {TQuerySettings} from "./types";

@Injectable()
export default class MainService<MODEL, CREATE_DTO, UPDATE_DTO> {
    private repository;

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
                            attributes = undefined
                        }: TQuerySettings): Promise<{
        result: Array<MODEL>,
        totalCount: number
    }> {
        let entitiesList = await this.repository.findAll({
            where: query,
            offset: offset,
            limit: limit,
            order: [[sortField, sortType]],
            raw: raw,
            attributes: attributes
        });

        let count = await this.repository.count({
            where: query
        });

        return {
            result: entitiesList,
            totalCount: count
        }
    }

    public async getEntity(id: number): Promise<MODEL> {
        let entity = await this.repository.findOne({where: {id}});

        if (!entity) throw new HttpException("Entity not found", 404);

        return entity;
    }

    public async create(dto: CREATE_DTO): Promise<MODEL> {
        return await this.repository.create(dto);
    }

    public async update(id: number, updateModel: UPDATE_DTO) {
        let entity = await this.repository.findOne({where: {id}});

        if (!entity) throw new HttpException("Entity not found", 404);

        for (let prop in updateModel) {
            entity[prop] = updateModel[prop];
        }

        await entity.save();

        return entity;
    }

    public async delete(id: number): Promise<void> {
        let entity = await this.repository.findOne({where: {id}});

        if (!entity) throw new HttpException("Entity not found", 404);

        await this.repository.destroy({where: {id}});
    }

    public async count(query: {[prop: string]: any}) {
        return await this.repository.count({
            where: query
        });
    }
}