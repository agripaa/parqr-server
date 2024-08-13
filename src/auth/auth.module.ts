import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { RolesGuard } from './guards/roles.guard';
import { RoleUser } from 'src/entities/roles.entity';
import { ProfileUser } from 'src/entities/profileUser.entity';
import { OtpCode } from 'src/entities/otpCode.entity';
import { OtpModule } from 'src/otp/otp.module';
import { VerifyGuard } from './guards/verify.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'IOJ2R39UjjdouU9JU999_349IDFuhf0HISDHFOQHF',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Users, RoleUser, ProfileUser, OtpCode]),
    OtpModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard, VerifyGuard],
  controllers: [AuthController],
  exports: [AuthService, VerifyGuard]
})
export class AuthModule {}
