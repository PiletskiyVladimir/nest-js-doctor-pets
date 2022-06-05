export type AuthPayload = {
    userId?: number;
    doctorId?: number;
    login: string;
    id: number;
};

export type LoginReqBody = {
    password: string;
    login: string;
};
