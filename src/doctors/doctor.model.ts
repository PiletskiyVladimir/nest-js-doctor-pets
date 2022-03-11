import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";
import {Clinic} from "../clinics/clinic.model";
import {DoctorClinics} from "../doctor-clinics/doctor-clinics.model";
import {Pet} from "../pets/pet.model";
import {DoctorPets} from "../doctor-pets/doctor-pets.model";
import {Report} from "../reports/report.model";

@Table({tableName: 'doctors'})
export class Doctor extends Model<Doctor> {
    @Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @BelongsToMany(() => Clinic, () => DoctorClinics)
    clinics: Clinic[]

    @BelongsToMany(() => Pet, () => DoctorPets)
    pets: Pet[]

    @HasMany(() => Report)
    reports: Report[]

    // TODO add info about doctor
}