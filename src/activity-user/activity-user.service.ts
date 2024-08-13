import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityUser } from 'src/entities/activityUser.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class ActivityUserService {
  constructor(
    @InjectRepository(ActivityUser)
    private activityUserRepository: Repository<ActivityUser>,
  ) {}

  async createActivityUser(userId: number, inferenceResultId: number, oldPlate: string, newPlate: string) {
    try {
      const activityUser = await this.activityUserRepository.create({
        user: { id: userId },
        inferenceResult: { id: inferenceResultId },
        oldPlate,
        newPlate,
      });
      return this.activityUserRepository.save(activityUser);
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getActivityUser(res: Response) {
    try {
      const activityUsers = await this.activityUserRepository.find({ relations: ['user', 'user.image_profile','inferenceResult'] });

      if(activityUsers.length === 0) {
        return res.status(404).json({status: 404, msg: "activity user is null"})
      }

      return res.status(200).json({ status: 200, data: activityUsers });
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
