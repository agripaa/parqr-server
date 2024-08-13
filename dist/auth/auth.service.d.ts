import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { RoleUser } from '../entities/roles.entity';
import { OperatorPayloadDto, OperatorSignPayloadDto, OwnerPayloadDto, OwnerSignInPayloadDto } from './dto/auth.dto';
import { Response } from 'express';
import { ProfileUser } from 'src/entities/profileUser.entity';
import { OtpCode } from 'src/entities/otpCode.entity';
import { OtpService } from 'src/otp/otp.service';
export declare class AuthService {
    private jwtService;
    private usersRepository;
    private rolesRepository;
    private profileRepository;
    private otpService;
    constructor(jwtService: JwtService, usersRepository: Repository<Users>, rolesRepository: Repository<RoleUser>, profileRepository: Repository<ProfileUser>, otpService: OtpService);
    validateOperator({ NIK, password }: OperatorPayloadDto): Promise<{
        id: number;
        uuid: string;
        NIK: string;
        email: string;
        username: string;
        role_id: RoleUser;
        createdAt: Date;
        updatedAt: Date;
        image_profile: ProfileUser;
        otpCodes: OtpCode[];
        activities: import("../entities/activityUser.entity").ActivityUser[];
    }>;
    validateOwner({ email, password }: OwnerPayloadDto): Promise<{
        id: number;
        uuid: string;
        NIK: string;
        email: string;
        username: string;
        role_id: RoleUser;
        createdAt: Date;
        updatedAt: Date;
        image_profile: ProfileUser;
        otpCodes: OtpCode[];
        activities: import("../entities/activityUser.entity").ActivityUser[];
    }>;
    validateUser(payload: {
        username: string;
        password: string;
    }): Promise<{
        id: number;
        uuid: string;
        NIK: string;
        email: string;
        username: string;
        role_id: RoleUser;
        createdAt: Date;
        updatedAt: Date;
        image_profile: ProfileUser;
        otpCodes: OtpCode[];
        activities: import("../entities/activityUser.entity").ActivityUser[];
    }>;
    loginOperator(userPayload: OperatorSignPayloadDto, res: Response): Promise<Response<any, Record<string, any>>>;
    loginOwner(userPayload: OwnerSignInPayloadDto, res: Response): Promise<Response<any, Record<string, any>>>;
    registerOperator(payload: OperatorPayloadDto, userPayload: any, file: Express.Multer.File): Promise<Users>;
    registerOwner(payload: OwnerPayloadDto): Promise<Users>;
    getProfile(user: any): Promise<Users>;
}
