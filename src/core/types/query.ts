import { FindAttributeOptions, WhereOptions } from 'sequelize';

export declare type TQuerySettings<MODEL> = {
    query: WhereOptions<MODEL>;
    limit: number;
    offset: number;
    sortField: string;
    sortType: string;
    raw?: boolean;
    attributes?: FindAttributeOptions;
};
