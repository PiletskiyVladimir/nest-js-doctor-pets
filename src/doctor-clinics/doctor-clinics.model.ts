import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { Clinic } from "../clinics/clinic.model";

@Table({tableName: 'doctor_clinics'})
export class DoctorClinics extends Model<DoctorClinics> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: false})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Clinic)
    @Column({type: DataType.INTEGER})
    clinicId: number;
}