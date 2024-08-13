import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('otp_code')
export class OtpCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  otp: string;

  @Column({ type: 'datetime', nullable: false, default: () => "NOW()" })
  expired: Date;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @ManyToOne(() => Users, (user) => user.otpCodes)
  @JoinColumn({ name: 'userId' })
  userId: Users;
}
