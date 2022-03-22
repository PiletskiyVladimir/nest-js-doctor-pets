import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {DoctorClinics} from "../doctor-clinics.module/doctor-clinics.model";
import {Doctor} from "../doctors.module/doctor.model";

@Table({tableName: 'clinics'})
export class Clinic extends Model<Clinic> {
    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, allowNull: false, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING})
    address: string;

    @Column({type: DataType.STRING})
    name: string;

    @BelongsToMany(() => Doctor, () => DoctorClinics)
    doctors: Doctor[];
}