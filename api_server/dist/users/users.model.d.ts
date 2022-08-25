import { Model } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
interface UserCreationAttr {
    first_name: string;
    last_name: string;
    middle_name: string | null;
    description: string | null;
    phone: string;
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttr> {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    description: string;
    phone: string;
    email: string;
    password: string;
    roles: Role[];
}
export {};
