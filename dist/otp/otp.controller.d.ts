import { OtpService } from './otp.service';
import { OtpCodePayloadDto } from './dto/otp.dto';
import { Request, Response } from 'express';
export declare class OtpController {
    private otpService;
    constructor(otpService: OtpService);
    verifyUser(otpPayload: OtpCodePayloadDto, req: Request): Promise<{
        status: number;
        message: string;
    }>;
    resendOtp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
