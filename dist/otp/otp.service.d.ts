import { OtpCode } from 'src/entities/otpCode.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { EmailService } from 'src/email/email.service';
import { OtpCodePayloadDto } from './dto/otp.dto';
export declare class OtpService {
    private otpCodeRepository;
    private mailService;
    constructor(otpCodeRepository: Repository<OtpCode>, mailService: EmailService);
    generateOtpToken(): string;
    createOrUpdateOtpSession(otpCode: string, user: Users): Promise<void>;
    verifyOwnerOtpCode(otpPayload: OtpCodePayloadDto, userId: number): Promise<{
        status: number;
        message: string;
    }>;
    resendOtpCode(userEmail: string): Promise<void>;
}
