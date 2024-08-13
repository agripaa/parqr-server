import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('data')
  async getAllData() {
    try {
      const data = await this.firebaseService.getAllData();
      return { status: 200, message: 'Data retrieved successfully', data };
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('data/:path')
  async getDataByPath(@Param('path') path: string){
    try {
      return this.firebaseService.getDataByParams(path)
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
