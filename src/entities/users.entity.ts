import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RoleUser } from './roles.entity';
import { IsEmail } from 'class-validator';
import { ProfileUser } from './profileUser.entity';
import { OtpCode } from './otpCode.entity';
import { ActivityUser } from './activityUser.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 25, unique: true, nullable: true })
  NIK: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @ManyToOne(() => RoleUser, roleUser => roleUser.users)
  @JoinColumn({ name: 'role_id' })
  role_id: RoleUser;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => ProfileUser, profileUser => profileUser.users)
  @JoinColumn({ name: 'image_profile' })
  image_profile: ProfileUser;

  @OneToMany(() => OtpCode, otpCode => otpCode.userId)
  otpCodes: OtpCode[];

  @OneToMany(() => ActivityUser, activityUser => activityUser.user)
  activities: ActivityUser[];

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }
}
