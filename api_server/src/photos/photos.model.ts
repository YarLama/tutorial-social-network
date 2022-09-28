import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';


interface PhotoCreationAttrs {
    userId: number;
    image: string;
    isAvatar: boolean;
}

@Table( {
    tableName: 'photos'
})
export class Photo extends Model<Photo, PhotoCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;
    
    @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: false})
    is_avatar: boolean;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

}