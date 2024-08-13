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
exports.VerifyGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const otpCode_entity_1 = require("../../entities/otpCode.entity");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_2 = require("typeorm");
let VerifyGuard = class VerifyGuard {
    constructor(reflector, otpCodeRepository, usersRepository) {
        this.reflector = reflector;
        this.otpCodeRepository = otpCodeRepository;
        this.usersRepository = usersRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.UnauthorizedException('User not logged in');
        }
        const otpVerified = await this.otpCodeRepository.findOne({ where: { userId: { id: user['sub'] } } });
        const ownerVerified = await this.usersRepository.findOne({ where: { id: user['sub'] }, relations: ['role_id'] });
        if (ownerVerified.role_id['role'] === 'owner') {
            if (!otpVerified.verified) {
                throw new common_1.UnauthorizedException('Owner must verify OTP to access this resource');
            }
        }
        return true;
    }
};
exports.VerifyGuard = VerifyGuard;
exports.VerifyGuard = VerifyGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(otpCode_entity_1.OtpCode)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VerifyGuard);
//# sourceMappingURL=verify.guard.js.map