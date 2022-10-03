import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface MessageCreationAttrs {
    fromUserId: number;
    toUserId: number;
    content: string;
    isVisible: boolean;
    image: string;
}

@Table( {
    tableName: 'messages'
})
export class Message extends Model<Message, MessageCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    content: string;

    @Column({type: DataType.STRING, defaultValue: null})
    image: string;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    is_visible: boolean;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    from_userId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    to_userId: number;

}