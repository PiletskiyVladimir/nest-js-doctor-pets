export class CreateDisabledTokenDto {
    readonly token: string;
    // can belong to user or doctor
    readonly entity_id: number;
}
