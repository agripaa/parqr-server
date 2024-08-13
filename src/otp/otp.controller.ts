import { Controller, Patch, Body, UseGuards, Req, Post, Res } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpCodePayloadDto } from './dto/otp.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request, Response } from 'express';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/verify_user')
  async verifyUser(@Body() otpPayload: OtpCodePayloadDto, @Req() req: Request) {
    const userId = req.user['sub'];
    return this.otpService.verifyOwnerOtpCode(otpPayload, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/resend_token')
  async resendOtp(@Req() req: Request, @Res() res: Response){
    const userEmail = req.user['email'];
    await this.otpService.resendOtpCode(userEmail)
    return res.status(201).json({ message: 'OTP resent successfully' });
  }
}
