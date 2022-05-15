export class CreatePetDto {
    readonly name: string;
    readonly species: string;
    readonly birthday: Date;
    readonly vaccines: Array<string>;
    readonly weight: number;
    readonly feeding_info: string;
}
