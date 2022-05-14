export class UpdateDoctorDto {
    readonly name: string;
    readonly lastName: string;
    readonly login: string;
    readonly skills: Array<string>;
}
