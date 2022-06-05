export class CreateClientDto {
    readonly name: string;
    readonly lastName: string;
    readonly login: string;
    readonly password: string;
    readonly password_salt?: string;
    readonly birthday?: Date;
}
