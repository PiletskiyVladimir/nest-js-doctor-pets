import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";

@Table({tableName: 'pets'})
export class Pet extends Model<Pet> {
    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId;

    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.STRING})
    population: string;

    @Column({type: DataType.STRING})
    image: string;

    @BelongsTo(() => User)
    owner: User;
}