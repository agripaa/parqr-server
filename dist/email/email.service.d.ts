import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendOtp(email: string, otpCode: string): Promise<void>;
}
