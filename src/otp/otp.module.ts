import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpCode } from 'src/entities/otpCode.entity';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { EmailModule } from 'src/email/email.module';
import { Users } from 'src/entities/users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OtpCode, Users]),
        EmailModule
    ],
    providers: [OtpService],
    controllers: [OtpController],
    exports: [OtpService, TypeOrmModule.forFeature([OtpCode])]
})
export class OtpModule {}
