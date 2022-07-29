import { Column, DataType, BelongsToMany, Model, Table, HasMany } from 'sequelize-typescript';
import { Doctor } from '../doctor/doctor.model';
import { DoctorClinics } from '../doctor-clinics/doctor-clinics.model';
import { WorkingHours } from './clinic.type';
import { Report } from '../reports/report.model';

@Table({ tableName: 'clinics' })
export class Clinic extends Model<Clinic> {
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    address: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.JSON, allowNull: false })
    working_hours: WorkingHours;

    @BelongsToMany(() => Doctor, () => DoctorClinics)
    doctors: Doctor[];

    @HasMany(() => Report)
    reports: Report[];
}
