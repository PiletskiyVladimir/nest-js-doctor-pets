import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pet } from '../pets/pet.model';

@Table({ tableName: 'clients' })
export class Client extends Model<Client, CreateUserDto> {
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.DATEONLY })
    birthday: Date;

    @HasMany(() => Pet)
    pets: Pet[];
}
