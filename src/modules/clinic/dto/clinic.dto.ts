import { WorkingHours } from '../clinic.type';

export class ClinicDto {
    readonly address: string;
    readonly name: string;
    readonly working_hours: WorkingHours;
}
