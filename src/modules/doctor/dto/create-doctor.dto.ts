export class CreateDoctorDto {
    readonly name: string;
    readonly lastName: string;
    readonly login: string;
    readonly password: string;
    readonly skills: Array<string>;
}
