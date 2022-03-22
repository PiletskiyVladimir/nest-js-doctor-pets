import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users.module/user.model";
import { Clinic } from "../clinics.module/clinic.model";
import {Doctor} from "../doctors.module/doctor.model";

@Table({tableName: 'doctor_clinics'})
export class DoctorClinics extends Model<DoctorClinics> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: false})
    id: number;

    @ForeignKey(() => Doctor)
    @Column({type: DataType.INTEGER})
    doctor_id: number;

    @ForeignKey(() => Clinic)
    @Column({type: DataType.INTEGER})
    clinic_id: number;
}