import { Repository } from 'typeorm';
import { InferenceResult } from '../entities/interfaceResult.entity';
import { ImageDetection } from 'src/entities/imageDetection.entity';
export declare class FirebaseService {
    private readonly inferenceResultRepository;
    private readonly imageDetectionRepository;
    constructor(inferenceResultRepository: Repository<InferenceResult>, imageDetectionRepository: Repository<ImageDetection>);
    private initializeFirebaseListeners;
    private processNewData;
    private processSingleData;
    getAllData(): Promise<{
        inferenceResults: InferenceResult[];
    }>;
    getDataByParams(path: string): Promise<{
        message: string;
    }>;
}
