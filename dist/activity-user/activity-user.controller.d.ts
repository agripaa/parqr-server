import { ActivityUserService } from './activity-user.service';
import { Response } from 'express';
export declare class ActivityUserController {
    private activityUserService;
    constructor(activityUserService: ActivityUserService);
    getAllActivity(res: Response): Promise<Response<any, Record<string, any>>>;
}
