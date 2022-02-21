import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";

@Table({tableName: 'sessions'})
export class Session extends Model<Session> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @Column({type: DataType.STRING})
    session: string;
}