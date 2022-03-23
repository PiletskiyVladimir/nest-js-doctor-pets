import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users.module/user.model";
import {Clinic} from "../clinics.module/clinic.model";
import {DoctorClinics} from "../doctor-clinics.module/doctor-clinics.model";
import {Pet} from "../pets.module/pet.model";
import {DoctorPets} from "../doctor-pets.module/doctor-pets.model";
import {Report} from "../reports.module/report.model";

@Table({tableName: 'doctors'})
export class Doctor extends Model<Doctor> {
    @Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @Column({type: DataType.DATEONLY})
    career_start: Date;

    @Column({type: DataType.STRING})
    specialization: string;

    @BelongsToMany(() => Clinic, () => DoctorClinics)
    clinics: Clinic[];

    @BelongsToMany(() => Pet, () => DoctorPets)
    pets: Pet[];

    @HasMany(() => Report)
    reports: Report[];
}