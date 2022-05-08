import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {Pet} from "../pets.module/pet.model";
import {Doctor} from "../doctors.module/doctor.model";
import {Session} from "../sessions.module/session.model";

@Table({tableName: 'users'})
export class User extends Model<User> {
    @Column({type: DataType.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    password_salt: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @HasMany(() => Pet)
    pets: Pet[];

    @HasOne(() => Doctor)
    doctor: Doctor

    @HasMany(() => Session)
    sessions: Session[]
}