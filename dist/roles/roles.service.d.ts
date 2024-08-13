import { Repository } from 'typeorm';
import { RoleUser } from '../entities/roles.entity';
export declare class RolesService {
    private roleUserRepository;
    constructor(roleUserRepository: Repository<RoleUser>);
    createRole(role: string): Promise<RoleUser>;
    deleteRole(id: number): Promise<import("typeorm").DeleteResult>;
    getRoles(): Promise<RoleUser[]>;
}
