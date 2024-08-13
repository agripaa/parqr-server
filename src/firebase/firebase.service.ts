import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InferenceResult } from '../entities/interfaceResult.entity';
import { ImageDetection } from 'src/entities/imageDetection.entity';
import { realtimeDatabase } from './firebase.config';

@Injectable()
export class FirebaseService {
  constructor(
    @InjectRepository(InferenceResult)
    private readonly inferenceResultRepository: Repository<InferenceResult>,
    @InjectRepository(ImageDetection)
    private readonly imageDetectionRepository: Repository<ImageDetection>,
  ) {
    this.initializeFirebaseListeners();
  }

  private initializeFirebaseListeners() {
    const dbRef = realtimeDatabase.ref('predict/');

    dbRef.on('child_added', (snapshot) => {
      const data = snapshot.val();
      this.processNewData(data);
    });

    dbRef.on('child_changed', (snapshot) => {
      const data = snapshot.val();
      this.processNewData(data);
    });
  }

  private async processNewData(data: any) {
    if (Array.isArray(data)) {
      for (const item of data) {
        await this.processSingleData(item);
      }
    } else {
      await this.processSingleData(data);
    }
  }

  private async processSingleData(data: any) {
    if (!data.image_url) {
      throw new HttpException('Image URL is missing', HttpStatus.BAD_REQUEST);
    }

    const existingData = await this.imageDetectionRepository.findOne({ where: { id: data.id } });
    if (existingData) {
      return;
    }

    try {
      const imageDetection = new ImageDetection();
      imageDetection.image_url = data.image_url;

      const savedImageDetection = await this.imageDetectionRepository.save(imageDetection);

      const inferenceResult = new InferenceResult();
      inferenceResult.predictions = data.predictions;
      inferenceResult.imageDetection = savedImageDetection;

      await this.inferenceResultRepository.save(inferenceResult);
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllData() {
    const inferenceResults = await this.inferenceResultRepository.find({ relations: ['imageDetection'] });
    return {
      inferenceResults,
    };
  }

  async getDataByParams(path: string) {
    try {
      const dbRef = realtimeDatabase.ref(path);
      const snapshot = await dbRef.get();
      if (snapshot.exists()) {
        const valDatas = snapshot.val();
        // Jika data berupa array, lakukan looping melalui setiap objek
        if (Array.isArray(valDatas)) {
          for (const item of valDatas) {
            await this.processNewData(item);
          }
        } else {
          await this.processNewData(valDatas);
        }
        return { message: 'Data processed successfully' };
      } else {
        return { message: 'No data found' };
      }
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
