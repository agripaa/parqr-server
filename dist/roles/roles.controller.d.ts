import { RolesService } from './roles.service';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    createRole(role: string): Promise<import("../entities/roles.entity").RoleUser>;
    deleteRole(id: number): Promise<import("typeorm").DeleteResult>;
    getAllRoles(): Promise<import("../entities/roles.entity").RoleUser[]>;
}
