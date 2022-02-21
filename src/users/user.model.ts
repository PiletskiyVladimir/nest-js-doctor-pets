import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/role.model";
import { UserRoles } from "../user-roles/user-roles.model";
import { Pet } from "../pets/pet.model";

@Table({tableName: 'users'})
export class User extends Model<User> {
    @Column({type: DataType.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @HasMany(() => Pet)
    pets: Pet[];

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}