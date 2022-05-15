/*
when user come to clinic or order visit to doctor from application
as a idea, maybe later add here photos from user
 */

export class CreateReportDto {
    readonly pet_id: number;
    readonly doctor_id: number;
    readonly clinic_id: number;
    readonly reason: string;
    readonly info_from_client: string;
}
