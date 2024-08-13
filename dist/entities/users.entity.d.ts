import { RoleUser } from './roles.entity';
import { ProfileUser } from './profileUser.entity';
import { OtpCode } from './otpCode.entity';
import { ActivityUser } from './activityUser.entity';
export declare class Users {
    id: number;
    uuid: string;
    NIK: string;
    email: string;
    username: string;
    password: string;
    role_id: RoleUser;
    createdAt: Date;
    updatedAt: Date;
    image_profile: ProfileUser;
    otpCodes: OtpCode[];
    activities: ActivityUser[];
    generateUuid(): void;
}
