import { Model, Table, Column, DataType, BelongsToMany, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Comment } from 'src/comments/comments.model';
import { LikesPost } from 'src/likes/likes_posts.model';
import { User } from 'src/users/users.model';

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    isCommentable: boolean;
    image: string;
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

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    is_commentable: boolean;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @HasMany(() => LikesPost)
    likes: LikesPost[];

    @BelongsTo(() => User)
    author: User;

    @HasMany(() => Comment)
    comments: Comment[];

}