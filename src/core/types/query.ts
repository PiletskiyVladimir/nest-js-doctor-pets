export declare type TQuerySettings = {
    query: Record<string, any>;
    limit: number;
    offset: number;
    sortField: string;
    sortType: string;
    raw?: boolean;
    attributes?: Array<string>;
};
