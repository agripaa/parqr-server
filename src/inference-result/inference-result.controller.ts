import { Controller, Get, Query, Param, ParseIntPipe, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { InferenceResultService } from './inference-result.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { VerifyGuard } from 'src/auth/guards/verify.guard';

@Controller('inference-result')
export class InferenceResultController {
  constructor(private readonly inferenceResultService: InferenceResultService) {}

  @Get('by-date')
  @UseGuards(JwtAuthGuard, VerifyGuard)
  async getDataByDate(@Query('date') date: string) {
    return this.inferenceResultService.getDataByDate(date);
  }

  @Get('by-plate')
  @UseGuards(JwtAuthGuard, VerifyGuard)
  async getDataByPlate(
    @Query('plate') plate: string
  ) {
    return this.inferenceResultService.getDataByPlate(plate);
  }

  @Get('by-date/count')
  @UseGuards(JwtAuthGuard, VerifyGuard)
  async getCountByDate(@Query('date') date: string){
    return this.inferenceResultService.getCountViolators(date);
  }

  @Get('by-feature')
  @UseGuards(JwtAuthGuard, VerifyGuard)
  async getDataByFeature(
    @Query('date') date?: string,
    @Query('cam') cam?: string,
    @Query('vehicle_category') vehicle_category?: string,
    @Query('search_plate') search_plate?: string
  ) {
    return this.inferenceResultService.getDataByFeature(date, cam, vehicle_category, search_plate);
  }

  @Get('detail-violators/')
  @UseGuards(JwtAuthGuard, VerifyGuard)
  async getDataPlate(@Query('plate') plate: string, @Query('id') id:number) {
    return this.inferenceResultService.getDetailViolator(plate);
  }

  @Patch('update-plate/')
  @UseGuards(JwtAuthGuard, VerifyGuard)
  async updatePlateNumber(
    @Body('id', ParseIntPipe) id: number, 
    @Body('old-plate') oldPlate: string, 
    @Body('new-plate') newPlate: string,
    @Req() req: Request
  ) {
    const decodedOldPlate = decodeURIComponent(oldPlate);
    const userId = req.user['sub'];
    return this.inferenceResultService.updatePlate(id, decodedOldPlate, newPlate, userId);
  }
}
