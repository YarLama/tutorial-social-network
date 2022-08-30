import { Model, Table, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';

interface PostCreationAttrs {
    email: string;
    password: string;
}

@Table( {
    tableName: 'posts'
})
export class Post extends Model<Post, PostCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    content: string;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    is_commentable: boolean;


}