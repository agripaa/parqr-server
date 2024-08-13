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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const otpCode_entity_1 = require("../entities/otpCode.entity");
const typeorm_2 = require("typeorm");
const email_service_1 = require("../email/email.service");
let OtpService = class OtpService {
    constructor(otpCodeRepository, mailService) {
        this.otpCodeRepository = otpCodeRepository;
        this.mailService = mailService;
    }
    generateOtpToken() {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    async createOrUpdateOtpSession(otpCode, user) {
        try {
            let otp = await this.otpCodeRepository.findOne({ where: { userId: { id: user.id } } });
            if (otp) {
                otp.otp = otpCode;
                otp.verified = false;
                otp.expired = new Date(Date.now() + 10 * 60 * 1000);
            }
            else {
                otp = new otpCode_entity_1.OtpCode();
                otp.otp = otpCode;
                otp.userId = user;
                otp.verified = false;
                otp.expired = new Date(Date.now() + 10 * 60 * 1000);
            }
            await this.otpCodeRepository.save(otp);
            await this.mailService.sendOtp(user.email, otpCode);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async verifyOwnerOtpCode(otpPayload, userId) {
        try {
            const validCode = await this.otpCodeRepository.findOne({ where: { otp: otpPayload.otp }, relations: ['userId'] });
            if (!validCode) {
                throw new common_1.BadRequestException('Invalid OTP code');
            }
            if (new Date() > new Date(validCode.expired)) {
                throw new common_1.BadRequestException('Expired OTP code');
            }
            if (validCode.userId.id !== userId) {
                throw new common_1.BadRequestException('User for OTP code does not match');
            }
            validCode.verified = true;
            await this.otpCodeRepository.save(validCode);
            return { status: 201, message: 'OTP verified successfully' };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('An error occurred while verifying the OTP code');
        }
    }
    async resendOtpCode(userEmail) {
        try {
            const user = await this.otpCodeRepository.findOne({
                where: { userId: { email: userEmail } },
                relations: ['userId'],
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            const newOtpCode = this.generateOtpToken();
            user.otp = newOtpCode;
            user.expired = new Date(Date.now() + 10 * 60 * 1000);
            user.verified = false;
            await this.otpCodeRepository.save(user);
            await this.mailService.sendOtp(userEmail, newOtpCode);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(otpCode_entity_1.OtpCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], OtpService);
//# sourceMappingURL=otp.service.js.map