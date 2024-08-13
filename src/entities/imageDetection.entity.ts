import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InferenceResult } from './interfaceResult.entity';

@Entity('image_detection')
export class ImageDetection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image_url: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  upload_at: Date;

  @OneToMany(() => InferenceResult, inferenceResult => inferenceResult.imageDetection)
  inferenceResults: InferenceResult[];
}
