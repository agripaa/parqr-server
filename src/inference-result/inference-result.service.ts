import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InferenceResult } from 'src/entities/interfaceResult.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityUserService } from 'src/activity-user/activity-user.service';

@Injectable()
export class InferenceResultService {
  constructor(
    @InjectRepository(InferenceResult)
    private readonly inferenceRepository: Repository<InferenceResult>,
    private readonly activityUserService: ActivityUserService
  ) {}

  async getDataByDate(date: string) {
    try {
      const query = this.inferenceRepository.createQueryBuilder('inference')
        .innerJoinAndSelect('inference.imageDetection', 'imageDetection')
        .where("JSON_EXTRACT(inference.predictions, '$.date') = :date", { date });

      const data = await query.getMany();
      if (data.length === 0) {
        throw new HttpException('No data found for the given date', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  async getCountViolators(date: string) {
    try {
      const query = this.inferenceRepository.createQueryBuilder('inference')
      .innerJoinAndSelect('inference.imageDetection', 'imageDetection')
      .where("JSON_EXTRACT(inference.predictions, '$.date') =:date", { date });

      const data = await query.getMany();

      if (date.length === 0){
        throw new HttpException('No data found for the given plate', HttpStatus.NOT_FOUND); 
      }

      return { status: 200, data_length: { length_violatiors_data: data.length }, data}
    } catch (error) {
      console.error(error)
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  async getDetailViolator(plate: string, id?: number) {
    try {
      const query = this.inferenceRepository.createQueryBuilder('inference')
        .innerJoinAndSelect('inference.imageDetection', 'imageDetection')
        .where("JSON_EXTRACT(inference.predictions, '$.plate') = :plate", { plate });
  
      if (id) {
        query.andWhere("JSON_EXTRACT(inference.id, '$.id') = :id", { id });
      }
  
      const data = await query.getOne();
      if (!data) {
        throw new HttpException('No data found for the given plate and id', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }
  

  async getDataByFeature(date?: string, cam?: string, vehicle_category?: string, search_plate?: string) {
    try {
      const query = this.inferenceRepository.createQueryBuilder('inference')
        .innerJoinAndSelect('inference.imageDetection', 'imageDetection');
  
      if (date) {
        query.andWhere("JSON_EXTRACT(inference.predictions, '$.date') = :date", { date });
      }
      if (cam) {
        query.andWhere("JSON_EXTRACT(inference.predictions, '$.cam') = :cam", { cam });
      }
      if (vehicle_category) {
        query.andWhere("JSON_EXTRACT(inference.predictions, '$.vehicle_category') = :vehicle_category", { vehicle_category });
      }
      if (search_plate) {
        query.andWhere("JSON_EXTRACT(inference.predictions, '$.plate') LIKE :search_plate", { search_plate: `%${search_plate}%` });
      }
  
      const data = await query.getMany();
      if (data.length === 0) {
        return new HttpException('No data found for the given features', HttpStatus.NOT_FOUND);
      }
  
      return data;
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }  

  async getDataByPlate(plate: string) {
    try {
      const query = this.inferenceRepository.createQueryBuilder('inference')
        .innerJoinAndSelect('inference.imageDetection', 'imageDetection')
        .where("JSON_EXTRACT(inference.predictions, '$.plate') = :plate", { plate });

      const data = await query.getMany();
      if (!data) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  async updatePlate(id: number, oldPlate: string, newPlate: string, userId: number) {
    try {
      const existingRecord = await this.inferenceRepository.createQueryBuilder('inference')
        .select('inference.change_status')
        .where('inference.id = :id', { id })
        .getOne();
    
      if (existingRecord.change_status === true) {
        return new HttpException('Plate number cannot be changed', HttpStatus.NOT_FOUND);
      }

      const result = await this.inferenceRepository.createQueryBuilder()
        .update(InferenceResult)
        .set({
          predictions: () => `JSON_SET(predictions, '$.plate', '${newPlate}')`,
          change_status: true
        })
        .where("id = :id", { id })
        .andWhere("JSON_EXTRACT(predictions, '$.plate') = :oldPlate", { oldPlate })
        .execute();

      if (result.affected === 0) {
        return new HttpException('Data not found or plate number not matched', HttpStatus.NOT_FOUND);
      }

      await this.activityUserService.createActivityUser(userId, id, oldPlate, newPlate);

      return { status: 201, message: 'Plate number updated successfully' };
    } catch (error) {
      return new HttpException('Failed to update plate number', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
