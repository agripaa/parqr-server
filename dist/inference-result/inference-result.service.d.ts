import { HttpException } from '@nestjs/common';
import { InferenceResult } from 'src/entities/interfaceResult.entity';
import { Repository } from 'typeorm';
import { ActivityUserService } from 'src/activity-user/activity-user.service';
export declare class InferenceResultService {
    private readonly inferenceRepository;
    private readonly activityUserService;
    constructor(inferenceRepository: Repository<InferenceResult>, activityUserService: ActivityUserService);
    getDataByDate(date: string): Promise<InferenceResult[]>;
    getCountViolators(date: string): Promise<{
        status: number;
        data_length: {
            length_violatiors_data: number;
        };
        data: InferenceResult[];
    }>;
    getDetailViolator(plate: string, id?: number): Promise<InferenceResult>;
    getDataByFeature(date?: string, cam?: string, vehicle_category?: string, search_plate?: string): Promise<InferenceResult[] | HttpException>;
    getDataByPlate(plate: string): Promise<InferenceResult[]>;
    updatePlate(id: number, oldPlate: string, newPlate: string, userId: number): Promise<HttpException | {
        status: number;
        message: string;
    }>;
}
