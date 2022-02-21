export declare type TQuerySettings = {
    query: {[prop: string]: any},
    limit: number,
    offset: number,
    sortField: string,
    sortType: string,
    raw?: boolean,
    attributes?: Array<string>
}

export interface ICommonServices<T, DTO> {
    getAll(querySettings: TQuerySettings): Promise<T[]>;
    getById(id: number): Promise<T>;
    create(dto: DTO): Promise<T>;
    update(id: number, updateModel: T): Promise<T>;
    delete(id: number): Promise<null>;
}