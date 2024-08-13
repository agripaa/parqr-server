import { FirebaseService } from './firebase.service';
export declare class DetectionController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    saveDetectionResult(data: any): Promise<{
        message: string;
    }>;
}
