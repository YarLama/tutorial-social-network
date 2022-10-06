import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Comment } from 'src/comments/comments.model';
import { User } from 'src/users/users.model';

interface LikesCommentCreationAttrs {
    userId: number;
    commentId: number;
}

@Table( {
    tableName: 'likes_comments',
    createdAt: false,
    updatedAt: false
})
export class LikesComment extends Model<LikesComment, LikesCommentCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Comment)
    @Column({type: DataType.INTEGER})
    commentId: number;

}