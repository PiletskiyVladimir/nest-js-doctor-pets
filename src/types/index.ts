export type TLoginResponse = {
    id: number;
    token: string;
}

export declare type TQuerySettings = {
    query: {[prop: string]: any},
    limit: number,
    offset: number,
    sortField: string,
    sortType: string,
    raw?: boolean,
    attributes?: Array<string>
}