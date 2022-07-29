import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Pet } from '../pets/pet.model';
import { Clinic } from '../clinic/clinic.model';
import { Doctor } from '../doctor/doctor.model';
import { REPORT_STATUS } from './report.constant';

@Table({ tableName: 'reports' })
export class Report extends Model<Report> {
    @Column({ primaryKey: true, allowNull: false, autoIncrement: true, unique: true, type: DataType.INTEGER })
    id: number;

    @ForeignKey(() => Pet)
    @Column({ type: DataType.INTEGER })
    pet_id: number;

    @ForeignKey(() => Clinic)
    @Column({ type: DataType.INTEGER })
    clinic_id: number;

    @ForeignKey(() => Doctor)
    @Column({ type: DataType.INTEGER })
    doctor_id: number;

    @Column({ type: DataType.STRING })
    status: REPORT_STATUS;

    @Column({ type: DataType.STRING })
    reason: string;

    @Column({ type: DataType.STRING })
    info_from_client: string;

    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    conclusion: string;

    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    doctor_notes: string;

    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    diagnosis: string;
}
