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
exports.FirebaseController = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase.service");
let FirebaseController = class FirebaseController {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async getAllData() {
        try {
            const data = await this.firebaseService.getAllData();
            return { status: 200, message: 'Data retrieved successfully', data };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to retrieve data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDataByPath(path) {
        try {
            return this.firebaseService.getDataByParams(path);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to retrieve data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FirebaseController = FirebaseController;
__decorate([
    (0, common_1.Get)('data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FirebaseController.prototype, "getAllData", null);
__decorate([
    (0, common_1.Get)('data/:path'),
    __param(0, (0, common_1.Param)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FirebaseController.prototype, "getDataByPath", null);
exports.FirebaseController = FirebaseController = __decorate([
    (0, common_1.Controller)('firebase'),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseController);
//# sourceMappingURL=firebase.controller.js.map