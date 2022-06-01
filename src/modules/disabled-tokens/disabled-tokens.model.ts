import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DisabledTokenDto } from './dto/disabled-token.dto';

@Table({ tableName: 'disabled-tokens', createdAt: true, updatedAt: true })
export class DisabledTokens extends Model<DisabledTokens, DisabledTokenDto> {
    @Column({ type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    token: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    entity_id: number;
}
