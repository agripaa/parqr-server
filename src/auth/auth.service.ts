import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { RoleUser } from '../entities/roles.entity';
import { OperatorPayloadDto, OperatorSignPayloadDto, OwnerPayloadDto, OwnerSignInPayloadDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { validate } from 'class-validator';
import { ProfileUser } from 'src/entities/profileUser.entity';
import { OtpCode } from 'src/entities/otpCode.entity';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(RoleUser)
    private rolesRepository: Repository<RoleUser>,
    @InjectRepository(ProfileUser)
    private profileRepository: Repository<ProfileUser>,
    private otpService: OtpService
  ) {}

  async validateOperator({ NIK, password }: OperatorPayloadDto) {
    try {
      const user = await this.usersRepository.findOne({ where: { NIK }, relations: ['role_id', 'profile_user'] });
      if (user && (await bcrypt.compare(password, user.password)) && user.role_id?.role === 'operator') {
        const { password, ...result } = user;
        return result;
      } 
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async validateOwner({ email, password }: OwnerPayloadDto) {
    try {
      const user = await this.usersRepository.findOne({ where: { email }, relations: ['role_id', 'profile_user'] });
      if (user && (await bcrypt.compare(password, user.password)) && user.role_id?.role === 'owner') {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async validateUser(payload: { username: string, password: string }) {
    try {
      const user = await this.usersRepository.findOne({
        where: [
          { NIK: payload.username },
          { email: payload.username }
        ],
        relations: ['role_id', 'profile_user']
      });
  
      if (user && (await bcrypt.compare(payload.password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
  
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async loginOperator(userPayload: OperatorSignPayloadDto, res: Response) {
    try {
      const user = await this.usersRepository.findOne({
        where: { NIK: userPayload.NIK },
        relations: ['role_id', 'image_profile']
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      const isPasswordValid = await bcrypt.compare(userPayload.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Password is incorrect!' });
      }

      const payload = { NIK: user.NIK, sub: user.id, role: user.role_id?.role };
      const token = this.jwtService.sign(payload);

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        user,
        access_token: token,
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }


  async loginOwner(userPayload: OwnerSignInPayloadDto, res: Response) {
    try {
      const user = await this.usersRepository.findOne({ where: { email: userPayload.email }, relations: ['role_id', 'image_profile'] });
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
    
      const isPasswordValid = await bcrypt.compare(userPayload.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Password is incorrect!' });
      }
    
      const payload = { email: user.email, sub: user.id, role: user.role_id?.role };
      const token = this.jwtService.sign(payload);

      const otpToken = this.otpService.generateOtpToken();
      await this.otpService.createOrUpdateOtpSession(otpToken, user);

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        user,
        access_token: token,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async registerOperator(payload: OperatorPayloadDto, userPayload:any, file: Express.Multer.File) {
    try {
      const errors = await validate(userPayload);
      if (errors.length > 0) {
        throw new UnauthorizedException(errors);
      }

      console.log({file})

      const role = await this.rolesRepository.findOne({ where: { role: 'operator' } });
      if(!role) throw new NotFoundException('Role Not Found!')
  
      const profileImage = new ProfileUser();
      const user = new Users();
  
      profileImage.image_url = file.path; 
      profileImage.name_image = file.filename;
      
      const savedProfileImage = await this.profileRepository.save(profileImage);
      
      user.NIK = payload.NIK;
      user.username = payload.username;
      user.password = await bcrypt.hash(payload.password, 10);
      user.role_id = role as RoleUser;
      user.image_profile = savedProfileImage as ProfileUser;
  
      return this.usersRepository.save(user);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async registerOwner(payload: OwnerPayloadDto) {
    try {
      const errors = await validate(payload);
      if (errors.length > 0) {
        throw new UnauthorizedException(errors);
      }
  
      const role = await this.rolesRepository.findOne({ where: { role: 'owner' } });
      if(!role) throw new NotFoundException('Role Not Found!');
  
      const profileImage = new ProfileUser();
  
      profileImage.image_url = null; 
      profileImage.name_image = null;
      
      const savedProfileImage = await this.profileRepository.save(profileImage);
      
  
      const user = new Users();
      user.email = payload.email;
      user.username = payload.username;
      user.password = await bcrypt.hash(payload.password, 10);
      user.role_id = role as RoleUser;
      user.image_profile = savedProfileImage as ProfileUser;
  
      return this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getProfile(user: any) {
    try {
      const query = this.usersRepository.createQueryBuilder('users')
        .leftJoinAndSelect('users.role_id', 'role')
        .leftJoinAndSelect('users.image_profile', 'image');

      if (user.email) {
        query.where('users.email = :email', { email: user.email });
      } else if (user.NIK) {
        query.where('users.NIK = :NIK', { NIK: user.NIK });
      } else {
        throw new InternalServerErrorException('No email or NIK provided');
      }

      const currentUser = await query.getOne();
      return currentUser;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
