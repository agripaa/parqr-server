import { Controller, Post, Body, UseGuards, Req, Get, UnauthorizedException, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request, Response } from 'express';
import { OperatorPayloadDto, OwnerPayloadDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('operator/login')
  async operatorLogin(@Body() payload: OperatorPayloadDto, @Res() res: Response) {
    return this.authService.loginOperator(payload, res);
  }

  @Post('owner/login')
  async ownerLogin(@Body() payload: OwnerPayloadDto, @Res() res: Response) {
    return this.authService.loginOwner(payload, res);
  }

  @Post('operator/register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  async registerOperator(@Body() payload: OperatorPayloadDto, @Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    try {
      return this.authService.registerOperator(payload, req.user, file);
    } catch (error) {
      console.error('Register Operator Error:', error);
    }
  }

  @Post('owner/register')
  async registerOwner(@Body() payload: OwnerPayloadDto) {
    return this.authService.registerOwner(payload);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async profileOwner(@Req() req: Request) {
    return this.authService.getProfile(req.user);
  }
}
