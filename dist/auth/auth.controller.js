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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./guards/jwt.guard");
const roles_guard_1 = require("./guards/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const auth_dto_1 = require("./dto/auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async operatorLogin(payload, res) {
        return this.authService.loginOperator(payload, res);
    }
    async ownerLogin(payload, res) {
        return this.authService.loginOwner(payload, res);
    }
    async registerOperator(payload, req, file) {
        try {
            return this.authService.registerOperator(payload, req.user, file);
        }
        catch (error) {
            console.error('Register Operator Error:', error);
        }
    }
    async registerOwner(payload) {
        return this.authService.registerOwner(payload);
    }
    async profileOwner(req) {
        return this.authService.getProfile(req.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('operator/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OperatorPayloadDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "operatorLogin", null);
__decorate([
    (0, common_1.Post)('owner/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OwnerPayloadDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "ownerLogin", null);
__decorate([
    (0, common_1.Post)('operator/register'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                callback(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OperatorPayloadDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerOperator", null);
__decorate([
    (0, common_1.Post)('owner/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OwnerPayloadDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerOwner", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profileOwner", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map