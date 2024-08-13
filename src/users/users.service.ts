import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { OperatorPayloadDto, OwnerPayloadDto } from './dto/user.dto';
import { ProfileUser } from 'src/entities/profileUser.entity';
import { ActivityUser } from 'src/entities/activityUser.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(ProfileUser)
    private profileUserRepository: Repository<ProfileUser>,
    @InjectRepository(ActivityUser)
    private activityUserRepository: Repository<ActivityUser>,
  ) {}

  async findAllUser(excludeUserId: number) {
    return await this.usersRepository.find({
      where: { id: Not(excludeUserId), role_id: Not(1) },
      relations: ['role_id', 'image_profile'],
    });
  }

  async findOneUser(userId: number) {
    return await this.usersRepository.findOne({where: {id: userId}, relations: ['role_id', 'image_profile']});
  }

  async updateOperator(id: number, updateOperatorDto: OperatorPayloadDto, file: Express.Multer.File) {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['image_profile', 'role_id'] });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    if (user.role_id['role'] !== 'operator') {
      throw new HttpException('Role Must Operator', HttpStatus.UNAUTHORIZED);
    }

    try {
      user.username = updateOperatorDto.username;
      user.NIK = updateOperatorDto.NIK;
      user.password = await bcrypt.hash(updateOperatorDto.password, 10);;

      if (file) {
        let profileUser = user.image_profile;

        if (!profileUser) {
          profileUser = new ProfileUser();
        }

        profileUser.image_url = file.path;
        profileUser.name_image = file.filename;

        user.image_profile = await this.profileUserRepository.save(profileUser);
      }

      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOwner(id: number, updateOwnerDto: OwnerPayloadDto, file: Express.Multer.File) {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['image_profile', 'role_id'] });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    if (user.role_id['role'] !== 'owner') {
      throw new HttpException('Role Must Owner', HttpStatus.UNAUTHORIZED);
    }

    try {
      user.username = updateOwnerDto.username;
      user.email = updateOwnerDto.email;
      user.password = updateOwnerDto.password;

      if (file) {
        let profileUser = user.image_profile;

        if (!profileUser) {
          profileUser = new ProfileUser();
        }

        profileUser.image_url = file.path;
        profileUser.name_image = file.filename;

        user.image_profile = await this.profileUserRepository.save(profileUser);
      }

      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['image_profile'] });
    
    if (!user) {
      throw new Error('User not found');
    }

    user.image_profile = null;
    await this.usersRepository.save(user);

    if (user?.image_profile) {
      await this.profileUserRepository.delete(user.image_profile.id);
    }
    await this.activityUserRepository.delete({ user: { id } });
    return await this.usersRepository.delete(id);
  }
}
