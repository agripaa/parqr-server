import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InferenceResult } from './interfaceResult.entity';

@Entity('vehicle_details')
export class VehicleDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InferenceResult)
  @JoinColumn({ name: 'inference_id' })
  inference: InferenceResult;

  @Column()
  vehicle_plate: string;

  @Column({ nullable: true })
  vehicle_plate_new: string;

  @Column({ nullable: true })
  vehicle_category: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  camera: string;

  @Column({ default: false })
  change_plate: boolean;
}
