import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('profile_user')
export class ProfileUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsNotEmpty()
  image_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name_image: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => Users, (user) => user.image_profile)
  users: Users[];
}
