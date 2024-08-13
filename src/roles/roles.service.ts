import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleUser } from '../entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleUser)
    private roleUserRepository: Repository<RoleUser>,
  ) {}

  async createRole(role: string) {
    const newRole = this.roleUserRepository.create({ role });
    return this.roleUserRepository.save(newRole);
  }

  async deleteRole(id: number) {
    return this.roleUserRepository.delete(id);
  }

  async getRoles() {
    return this.roleUserRepository.find();
  }
}
