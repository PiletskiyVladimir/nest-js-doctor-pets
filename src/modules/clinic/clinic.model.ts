import { Column, DataType, BelongsToMany, Model, Table } from 'sequelize-typescript';
import { ClinicDto } from './dto/clinic.dto';
import { Doctor } from '../doctor/doctor.model';
import { DoctorClinics } from '../doctor-clinics/doctor-clinics.model';
import { WorkingHours } from './clinic.type';

@Table({ tableName: 'clinics' })
export class Clinic extends Model<Clinic, ClinicDto> {
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
}
