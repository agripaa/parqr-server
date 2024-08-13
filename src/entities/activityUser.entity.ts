import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './users.entity';
import { InferenceResult } from './interfaceResult.entity';

@Entity('activity_user')
export class ActivityUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InferenceResult, inferenceResult => inferenceResult.activities)
  @JoinColumn({ name: 'inference_result_id' })
  inferenceResult: InferenceResult;

  @Column()
  oldPlate: string;

  @Column()
  newPlate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, user => user.activities)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
