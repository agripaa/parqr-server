import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InferenceResult } from 'src/entities/interfaceResult.entity';
import { InferenceResultService } from './inference-result.service';
import { InferenceResultController } from './inference-result.controller';
import { ActivityUserModule } from 'src/activity-user/activity-user.module';
import { OtpModule } from 'src/otp/otp.module';
import { OtpCode } from 'src/entities/otpCode.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([InferenceResult, OtpCode]),
        ActivityUserModule,
        OtpModule,
        AuthModule  // Import AuthModule

    ], 
    providers: [InferenceResultService],
    controllers: [InferenceResultController],
    exports: [InferenceResultService]
})
export class InferenceResultModule {}
