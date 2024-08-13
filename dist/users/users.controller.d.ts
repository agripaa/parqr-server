import { UsersService } from './users.service';
import { OperatorPayloadDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findUsers(req: any): Promise<import("../entities/users.entity").Users[]>;
    findOneUser(id: number): Promise<import("../entities/users.entity").Users>;
    updateOperator(id: number, updateOperatorDto: OperatorPayloadDto, file: Express.Multer.File): Promise<import("../entities/users.entity").Users>;
    deleteOperator(id: number): Promise<import("typeorm").DeleteResult>;
}
