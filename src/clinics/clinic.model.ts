import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { DoctorClinics } from "../doctor-clinics/doctor-clinics.model";

@Table({tableName: 'clinics'})
export class Clinic extends Model<Clinic> {
    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, allowNull: false, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING})
    address: string;

    @Column({type: DataType.STRING})
    name: string;

    @BelongsToMany(() => User, ()=> DoctorClinics)
    doctors: User[];
}