import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OtpCode } from 'src/entities/otpCode.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class VerifyGuard implements CanActivate {
    private reflector;
    private readonly otpCodeRepository;
    private readonly usersRepository;
    constructor(reflector: Reflector, otpCodeRepository: Repository<OtpCode>, usersRepository: Repository<Users>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
