export class CreateUserDto {
    readonly login: string;
    readonly password: string;
    readonly password_salt: string;
    readonly name: string;
    readonly surname: string;
}