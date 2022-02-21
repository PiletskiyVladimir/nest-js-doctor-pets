import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { Pet } from "../pets/pet.model";

@Table({tableName: 'reports'})
export class Report extends Model<Report> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    doctorId: number;

    @ForeignKey(() => Pet)
    @Column({type: DataType.INTEGER})
    petId: number;

    @Column({type: DataType.STRING})
    reason: string;

    @Column({type: DataType.STRING})
    treatment: string;
}