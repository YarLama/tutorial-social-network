import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "src/comments/comments.model";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "./user_role.model";


interface UserCreationAttr {
    first_name: string;
    last_name: string;
    middle_name: string | null;
    description: string | null;
    phone: string;
    email: string;
    password: string;
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, UserCreationAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    first_name: string;

    @Column({type: DataType.STRING, allowNull: false})
    last_name: string;

    @Column({type: DataType.STRING, allowNull: true})
    middle_name: string;

    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @Column({type: DataType.STRING, allowNull: false})
    phone: string;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
    
    @HasMany(() => Post)
    posts: Post[];

    @HasMany(() => Comment)
    comments: Comment[];
}