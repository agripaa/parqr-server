export class UserOtpPayloadDto {
    id: number;
    username: string;
    email: string;
    password: string;
    NIK?: string;
    role_id: any;
    profile_user: any;
    createdAt: Date;
    updatedAt: Date;
}

export class OtpCodePayloadDto { otp: string; }