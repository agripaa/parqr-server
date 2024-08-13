import { InferenceResult } from './interfaceResult.entity';
export declare class VehicleDetail {
    id: number;
    inference: InferenceResult;
    vehicle_plate: string;
    vehicle_plate_new: string;
    vehicle_category: string;
    location: string;
    duration: string;
    camera: string;
    change_plate: boolean;
}
