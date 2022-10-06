import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { LikesComment } from 'src/likes/likes_comments.model';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';

interface CommentCreationAttrs {
    content: string;
    userId: number;
    postId: number;
}

@Table( {
    tableName: 'comments'
})
export class Comment extends Model<Comment, CommentCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    content: string;

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER})
    postId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => LikesComment)
    likes: LikesComment[];

    @BelongsTo(() => Post)
    post: Post;

}