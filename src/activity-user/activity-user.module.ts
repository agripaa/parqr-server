import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityUserService } from './activity-user.service';
import { ActivityUser } from 'src/entities/activityUser.entity';
import { ActivityUserController } from './activity-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityUser])],
  providers: [ActivityUserService],
  controllers: [ActivityUserController],
  exports: [ActivityUserService],
})
export class ActivityUserModule {}
