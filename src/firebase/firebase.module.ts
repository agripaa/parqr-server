import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageDetection } from 'src/entities/imageDetection.entity';
import { InferenceResult } from 'src/entities/interfaceResult.entity';
import { VehicleDetail } from 'src/entities/vehicleDetail.entity';
import { ActivityUser } from 'src/entities/activityUser.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ImageDetection, InferenceResult, VehicleDetail, ActivityUser])
  ],
  providers: [FirebaseService],
  controllers: [FirebaseController],
  exports: [FirebaseService],
})
export class FirebaseModule {}
