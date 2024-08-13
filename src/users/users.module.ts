import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'src/entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfileUser } from 'src/entities/profileUser.entity';
import { ActivityUser } from 'src/entities/activityUser.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, ProfileUser, ActivityUser]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
