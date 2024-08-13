import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { OperatorPayloadDto, OwnerPayloadDto } from './dto/user.dto';
import { ProfileUser } from 'src/entities/profileUser.entity';
import { ActivityUser } from 'src/entities/activityUser.entity';
export declare class UsersService {
    private usersRepository;
    private profileUserRepository;
    private activityUserRepository;
    constructor(usersRepository: Repository<Users>, profileUserRepository: Repository<ProfileUser>, activityUserRepository: Repository<ActivityUser>);
    findAllUser(excludeUserId: number): Promise<Users[]>;
    findOneUser(userId: number): Promise<Users>;
    updateOperator(id: number, updateOperatorDto: OperatorPayloadDto, file: Express.Multer.File): Promise<Users>;
    updateOwner(id: number, updateOwnerDto: OwnerPayloadDto, file: Express.Multer.File): Promise<Users>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
