import { Controller, UploadedFile, UseInterceptors, Body, Param, Patch, Get, UseGuards, Req, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { OperatorPayloadDto } from './dto/user.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findUsers(@Req() req: any) {
    const loggedInUserId = req.user['sub'];
    return this.usersService.findAllUser(loggedInUserId);
  }

  @Get('find/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOneUser(@Param('id') id:number){
    return this.usersService.findOneUser(id);
  }

  @Patch('update-operator/:id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  async updateOperator(@Param('id') id: number, @Body() updateOperatorDto: OperatorPayloadDto, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.updateOperator(id, updateOperatorDto, file);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteOperator(@Param('id') id:number) {
    return this.usersService.deleteUser(id);
  }
}
