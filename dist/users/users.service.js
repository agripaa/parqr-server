"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../entities/users.entity");
const profileUser_entity_1 = require("../entities/profileUser.entity");
const activityUser_entity_1 = require("../entities/activityUser.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository, profileUserRepository, activityUserRepository) {
        this.usersRepository = usersRepository;
        this.profileUserRepository = profileUserRepository;
        this.activityUserRepository = activityUserRepository;
    }
    async findAllUser(excludeUserId) {
        return await this.usersRepository.find({
            where: { id: (0, typeorm_2.Not)(excludeUserId), role_id: (0, typeorm_2.Not)(1) },
            relations: ['role_id', 'image_profile'],
        });
    }
    async findOneUser(userId) {
        return await this.usersRepository.findOne({ where: { id: userId }, relations: ['role_id', 'image_profile'] });
    }
    async updateOperator(id, updateOperatorDto, file) {
        const user = await this.usersRepository.findOne({ where: { id }, relations: ['image_profile', 'role_id'] });
        if (!user) {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.role_id['role'] !== 'operator') {
            throw new common_1.HttpException('Role Must Operator', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            user.username = updateOperatorDto.username;
            user.NIK = updateOperatorDto.NIK;
            user.password = await bcrypt.hash(updateOperatorDto.password, 10);
            ;
            if (file) {
                let profileUser = user.image_profile;
                if (!profileUser) {
                    profileUser = new profileUser_entity_1.ProfileUser();
                }
                profileUser.image_url = file.path;
                profileUser.name_image = file.filename;
                user.image_profile = await this.profileUserRepository.save(profileUser);
            }
            await this.usersRepository.save(user);
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateOwner(id, updateOwnerDto, file) {
        const user = await this.usersRepository.findOne({ where: { id }, relations: ['image_profile', 'role_id'] });
        if (!user) {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.role_id['role'] !== 'owner') {
            throw new common_1.HttpException('Role Must Owner', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            user.username = updateOwnerDto.username;
            user.email = updateOwnerDto.email;
            user.password = updateOwnerDto.password;
            if (file) {
                let profileUser = user.image_profile;
                if (!profileUser) {
                    profileUser = new profileUser_entity_1.ProfileUser();
                }
                profileUser.image_url = file.path;
                profileUser.name_image = file.filename;
                user.image_profile = await this.profileUserRepository.save(profileUser);
            }
            await this.usersRepository.save(user);
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async deleteUser(id) {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(profileUser_entity_1.ProfileUser)),
    __param(2, (0, typeorm_1.InjectRepository)(activityUser_entity_1.ActivityUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map