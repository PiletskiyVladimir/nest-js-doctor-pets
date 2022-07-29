import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Client } from '../client/client.model';

@Table({ tableName: 'sessions', timestamps: false })
export class Session extends Model<Session> {
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true, allowNull: false })
    id: number;

    @ForeignKey(() => Client)
    @Column({ type: DataType.INTEGER })
    user: number;

    @Column({ type: DataType.STRING })
    token: string;

    @Column({ type: DataType.DATE })
    validTo: Date;
}
