/*
when visit to dog is finished and doctor makes his conclusion
 */
export class UpdateReportDto {
    readonly conclusion: string;
    readonly doctor_notes: string;
    readonly diagnosis?: string;
}
