import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DoctorClinicDto } from './dto/doctor-clinic.dto';
import { Doctor } from '../doctor/doctor.model';
import { Clinic } from '../clinic/clinic.model';

@Table({ tableName: 'doctor_clinics' })
export class DoctorClinics extends Model<DoctorClinics, DoctorClinicDto> {
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true, allowNull: false })
    id: number;

    @ForeignKey(() => Doctor)
    @Column({ type: DataType.INTEGER })
    doctor_id: number;

    @ForeignKey(() => Clinic)
    @Column({ type: DataType.INTEGER })
    clinic_id: number;
}
