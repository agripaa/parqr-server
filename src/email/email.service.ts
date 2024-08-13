import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendOtp(email: string, otpCode: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otpCode}`, 
      });
    } catch (error) {
      throw new InternalServerErrorException('Error sending email');
    }
  }
}
