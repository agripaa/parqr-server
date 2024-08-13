import { Users } from './users.entity';
export declare class RoleUser {
    id: number;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    users: Users[];
}
