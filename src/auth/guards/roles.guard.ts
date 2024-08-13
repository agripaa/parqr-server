import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      throw new NotFoundException('Session Not Found, User Must login!');
    }
    if (roles.includes('owner') && user.role !== 'owner') {
      throw new UnauthorizedException('Role not valid');
    }
    return true;
  }
}
