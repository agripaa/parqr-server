import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ImageDetection } from './imageDetection.entity';
import { ActivityUser } from './activityUser.entity';

@Entity('inference_results')
export class InferenceResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  predictions: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  processed_at: Date;

  @Column({ type:'boolean', default: false })
  change_status: boolean;

  @ManyToOne(() => ImageDetection, imageDetection => imageDetection.inferenceResults)
  @JoinColumn({ name: 'image_detection_id' })
  imageDetection: ImageDetection;

  @OneToMany(() => ActivityUser, activityUser => activityUser.inferenceResult)
  activities: ActivityUser[];
}
