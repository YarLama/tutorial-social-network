import { User } from "src/users/users.model";

export interface IToken {
    token: string;
}

export type ContactWithUser = {
    id: number;
    description: string;
    user: User;
}