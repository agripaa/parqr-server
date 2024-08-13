import { InferenceResult } from './interfaceResult.entity';
export declare class ImageDetection {
    id: number;
    image_url: string;
    upload_at: Date;
    inferenceResults: InferenceResult[];
}
