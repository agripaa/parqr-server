import { ImageDetection } from './imageDetection.entity';
import { ActivityUser } from './activityUser.entity';
export declare class InferenceResult {
    id: number;
    predictions: any;
    processed_at: Date;
    change_status: boolean;
    imageDetection: ImageDetection;
    activities: ActivityUser[];
}
