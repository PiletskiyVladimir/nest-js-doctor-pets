import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Clinic } from '../clinic/clinic.model';
import { DoctorClinics } from '../doctor-clinics/doctor-clinics.model';
import { Report } from '../reports/report.model';

@Table({ tableName: 'doctors' })
export class Doctor extends Model<Doctor> {
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password_salt: string;

    @Column({ type: DataType.JSON })
    skills: Array<string>;

    @BelongsToMany(() => Clinic, () => DoctorClinics)
    clinics: Clinic[];

    @HasMany(() => Report)
    reports: Report[];
}
