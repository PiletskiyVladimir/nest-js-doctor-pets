import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Doctor} from "../doctors.module/doctor.model";
import {Pet} from "../pets.module/pet.model";

@Table({tableName: 'doctor_pets'})
export class DoctorPets extends Model<DoctorPets> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: false})
    id: number;

    @ForeignKey(() => Doctor)
    @Column({type: DataType.INTEGER})
    doctor_id: number;

    @ForeignKey(() => Pet)
    @Column({type: DataType.INTEGER})
    pet_id: number;
}