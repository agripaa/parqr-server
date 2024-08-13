import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OtpCode } from 'src/entities/otpCode.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(OtpCode)
    private readonly otpCodeRepository: Repository<OtpCode>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not logged in');
    }

    const otpVerified = await this.otpCodeRepository.findOne({where: {userId: {id: user['sub']}}})
    const ownerVerified = await this.usersRepository.findOne({where: {id: user['sub']}, relations: ['role_id']})
    

    if(ownerVerified.role_id['role'] === 'owner'){
      if (!otpVerified.verified) {
          throw new UnauthorizedException('Owner must verify OTP to access this resource');
      }
    }

    return true;
  }
}
