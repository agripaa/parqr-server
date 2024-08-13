import { ActivityUser } from 'src/entities/activityUser.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
export declare class ActivityUserService {
    private activityUserRepository;
    constructor(activityUserRepository: Repository<ActivityUser>);
    createActivityUser(userId: number, inferenceResultId: number, oldPlate: string, newPlate: string): Promise<ActivityUser>;
    getActivityUser(res: Response): Promise<Response<any, Record<string, any>>>;
}
