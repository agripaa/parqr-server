import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpCode } from 'src/entities/otpCode.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { EmailService } from 'src/email/email.service';
import { OtpCodePayloadDto } from './dto/otp.dto';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpCode)
    private otpCodeRepository: Repository<OtpCode>,
    private mailService: EmailService
  ) {}

  generateOtpToken() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  async createOrUpdateOtpSession(otpCode: string, user: Users) {
    try {
      let otp = await this.otpCodeRepository.findOne({ where: { userId: {id: user.id} } });

      if (otp) {
        otp.otp = otpCode;
        otp.verified = false; // Set verified to false on update
        otp.expired = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
      } else {
        otp = new OtpCode();
        otp.otp = otpCode;
        otp.userId = user;
        otp.verified = false; // Set verified to false on creation
        otp.expired = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
      }

      await this.otpCodeRepository.save(otp);
      await this.mailService.sendOtp(user.email, otpCode);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyOwnerOtpCode(otpPayload: OtpCodePayloadDto, userId: number) {
    try {
      const validCode = await this.otpCodeRepository.findOne({ where: { otp: otpPayload.otp }, relations: ['userId'] });

      if (!validCode) {
        throw new BadRequestException('Invalid OTP code');
      }

      if (new Date() > new Date(validCode.expired)) {
        throw new BadRequestException('Expired OTP code');
      }

      if (validCode.userId.id !== userId) {
        throw new BadRequestException('User for OTP code does not match');
      }

      validCode.verified = true;
      await this.otpCodeRepository.save(validCode);

      return { status: 201, message: 'OTP verified successfully' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An error occurred while verifying the OTP code');
    }
  }

  async resendOtpCode(userEmail: string){
    try {
      const user = await this.otpCodeRepository.findOne({
        where: { userId: { email: userEmail } },
        relations: ['userId'],
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const newOtpCode = this.generateOtpToken();
      user.otp = newOtpCode;
      user.expired = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
      user.verified = false; // Reset verification status

      await this.otpCodeRepository.save(user);
      await this.mailService.sendOtp(userEmail, newOtpCode);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
