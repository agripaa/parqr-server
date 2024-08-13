import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; // Import HandlebarsAdapter
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', 
        port: 465,
        auth: {
          user: 'agrieva.xananda08@gmail.com',
          pass: 'bcxjdtcxjunknfzd', 
        },
      },
      defaults: {
        from: '"No Reply" <noreply@gmail.com>',
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
