import { FirebaseService } from './firebase.service';
export declare class FirebaseController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    getAllData(): Promise<{
        status: number;
        message: string;
        data: {
            inferenceResults: import("../entities/interfaceResult.entity").InferenceResult[];
        };
    }>;
    getDataByPath(path: string): Promise<{
        message: string;
    }>;
}
