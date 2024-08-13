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
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../entities/users.entity");
const roles_entity_1 = require("../entities/roles.entity");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
const profileUser_entity_1 = require("../entities/profileUser.entity");
const otp_service_1 = require("../otp/otp.service");
let AuthService = class AuthService {
    constructor(jwtService, usersRepository, rolesRepository, profileRepository, otpService) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.profileRepository = profileRepository;
        this.otpService = otpService;
    }
    async validateOperator({ NIK, password }) {
        try {
            const user = await this.usersRepository.findOne({ where: { NIK }, relations: ['role_id', 'profile_user'] });
            if (user && (await bcrypt.compare(password, user.password)) && user.role_id?.role === 'operator') {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async validateOwner({ email, password }) {
        try {
            const user = await this.usersRepository.findOne({ where: { email }, relations: ['role_id', 'profile_user'] });
            if (user && (await bcrypt.compare(password, user.password)) && user.role_id?.role === 'owner') {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async validateUser(payload) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async loginOperator(userPayload, res) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Internal Server Error');
        }
    }
    async loginOwner(userPayload, res) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async registerOperator(payload, userPayload, file) {
        try {
            const errors = await (0, class_validator_1.validate)(userPayload);
            if (errors.length > 0) {
                throw new common_1.UnauthorizedException(errors);
            }
            console.log({ file });
            const role = await this.rolesRepository.findOne({ where: { role: 'operator' } });
            if (!role)
                throw new common_1.NotFoundException('Role Not Found!');
            const profileImage = new profileUser_entity_1.ProfileUser();
            const user = new users_entity_1.Users();
            profileImage.image_url = file.path;
            profileImage.name_image = file.filename;
            const savedProfileImage = await this.profileRepository.save(profileImage);
            user.NIK = payload.NIK;
            user.username = payload.username;
            user.password = await bcrypt.hash(payload.password, 10);
            user.role_id = role;
            user.image_profile = savedProfileImage;
            return this.usersRepository.save(user);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async registerOwner(payload) {
        try {
            const errors = await (0, class_validator_1.validate)(payload);
            if (errors.length > 0) {
                throw new common_1.UnauthorizedException(errors);
            }
            const role = await this.rolesRepository.findOne({ where: { role: 'owner' } });
            if (!role)
                throw new common_1.NotFoundException('Role Not Found!');
            const profileImage = new profileUser_entity_1.ProfileUser();
            profileImage.image_url = null;
            profileImage.name_image = null;
            const savedProfileImage = await this.profileRepository.save(profileImage);
            const user = new users_entity_1.Users();
            user.email = payload.email;
            user.username = payload.username;
            user.password = await bcrypt.hash(payload.password, 10);
            user.role_id = role;
            user.image_profile = savedProfileImage;
            return this.usersRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getProfile(user) {
        try {
            const query = this.usersRepository.createQueryBuilder('users')
                .leftJoinAndSelect('users.role_id', 'role')
                .leftJoinAndSelect('users.image_profile', 'image');
            if (user.email) {
                query.where('users.email = :email', { email: user.email });
            }
            else if (user.NIK) {
                query.where('users.NIK = :NIK', { NIK: user.NIK });
            }
            else {
                throw new common_1.InternalServerErrorException('No email or NIK provided');
            }
            const currentUser = await query.getOne();
            return currentUser;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.RoleUser)),
    __param(3, (0, typeorm_1.InjectRepository)(profileUser_entity_1.ProfileUser)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        otp_service_1.OtpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map