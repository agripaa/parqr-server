import { Users } from './users.entity';
import { InferenceResult } from './interfaceResult.entity';
export declare class ActivityUser {
    id: number;
    inferenceResult: InferenceResult;
    oldPlate: string;
    newPlate: string;
    createdAt: Date;
    updatedAt: Date;
    user: Users;
}
