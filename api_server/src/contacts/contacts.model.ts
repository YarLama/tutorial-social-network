import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';


interface ContactCreationAttrs {
    userId: number;
    targetUserId: number;
    description: string;
}

@Table( {
    tableName: 'contacts',
    updatedAt: false,
    createdAt: false
})
export class Contact extends Model<Contact, ContactCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    description: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    targetUserId: number;

}