import { Controller, Get, Res } from '@nestjs/common';
import { ActivityUserService } from './activity-user.service';
import { Response } from 'express';

@Controller('activity-user')
export class ActivityUserController {
  constructor(private activityUserService: ActivityUserService) {}

  @Get('/get-all')
  async getAllActivity(@Res() res: Response) {
    return this.activityUserService.getActivityUser(res);
  }
}
