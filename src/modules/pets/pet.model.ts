import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CreatePetDto } from './dto/create-pet.dto';
import { Client } from '../client/client.model';

@Table({ tableName: 'pets' })
export class Pet extends Model<Pet, CreatePetDto> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, allowNull: false, primaryKey: true })
    id: number;

    @ForeignKey(() => Client)
    @Column({ type: DataType.INTEGER })
    owner_id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    species: string;

    @Column({ type: DataType.DATEONLY })
    birthday: Date;

    @Column({ type: DataType.JSON })
    vaccines: Array<string>;

    @Column({ type: DataType.INTEGER })
    weight: number;

    @Column({ type: DataType.STRING })
    feeding_info: string;
}
