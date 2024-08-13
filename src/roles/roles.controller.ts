import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post('create')
  async createRole(@Body('role') role: string) {
    return this.rolesService.createRole(role);
  }

  @Delete('delete/:id')
  async deleteRole(@Param('id') id: number) {
    return this.rolesService.deleteRole(id);
  }

  @Get()
  async getAllRoles() {
    return this.rolesService.getRoles();
  }
}
