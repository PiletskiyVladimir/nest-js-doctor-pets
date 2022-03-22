import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { User } from "../users.module/user.model";
import {Doctor} from "../doctors.module/doctor.model";
import {DoctorPets} from "../doctor-pets.module/doctor-pets.model";
import {Report} from "../reports.module/report.model";

@Table({tableName: 'pets'})
export class Pet extends Model<Pet> {
    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id;

    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.STRING})
    population: string;

    @Column({type: DataType.STRING})
    image: string;

    @BelongsToMany(() => Doctor, () => DoctorPets)
    doctors: Doctor[]

    @HasMany(() => Report)
    reports: Report[]
}