import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { OtpModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';
import { FirebaseModule } from './firebase/firebase.module';
import { InferenceResultModule } from './inference-result/inference-result.module';
import { ActivityUserModule } from './activity-user/activity-user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    OtpModule,
    EmailModule,
    FirebaseModule,
    InferenceResultModule,
    ActivityUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
