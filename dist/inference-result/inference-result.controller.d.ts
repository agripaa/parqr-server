import { InferenceResultService } from './inference-result.service';
import { Request } from 'express';
export declare class InferenceResultController {
    private readonly inferenceResultService;
    constructor(inferenceResultService: InferenceResultService);
    getDataByDate(date: string): Promise<import("../entities/interfaceResult.entity").InferenceResult[]>;
    getDataByPlate(plate: string): Promise<import("../entities/interfaceResult.entity").InferenceResult[]>;
    getCountByDate(date: string): Promise<{
        status: number;
        data_length: {
            length_violatiors_data: number;
        };
        data: import("../entities/interfaceResult.entity").InferenceResult[];
    }>;
    getDataByFeature(date?: string, cam?: string, vehicle_category?: string, search_plate?: string): Promise<import("../entities/interfaceResult.entity").InferenceResult[] | import("@nestjs/common").HttpException>;
    getDataPlate(plate: string, id: number): Promise<import("../entities/interfaceResult.entity").InferenceResult>;
    updatePlateNumber(id: number, oldPlate: string, newPlate: string, req: Request): Promise<import("@nestjs/common").HttpException | {
        status: number;
        message: string;
    }>;
}
