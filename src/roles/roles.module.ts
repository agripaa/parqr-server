import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleUser } from '../entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleUser])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
