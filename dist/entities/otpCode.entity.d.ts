import { Users } from './users.entity';
export declare class OtpCode {
    id: number;
    otp: string;
    expired: Date;
    verified: boolean;
    userId: Users;
}
