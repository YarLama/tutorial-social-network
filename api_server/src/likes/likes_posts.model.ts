import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Post } from 'src/posts/posts.model';

interface LikesPostCreationAttrs {
    userId: number;
    postId: number;
}

@Table( {
    tableName: 'likes_posts',
    createdAt: false,
    updatedAt: false
})
export class LikesPost extends Model<LikesPost, LikesPostCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER})
    postId: number;

}