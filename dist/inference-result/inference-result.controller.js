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
exports.InferenceResultController = void 0;
const common_1 = require("@nestjs/common");
const inference_result_service_1 = require("./inference-result.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const verify_guard_1 = require("../auth/guards/verify.guard");
let InferenceResultController = class InferenceResultController {
    constructor(inferenceResultService) {
        this.inferenceResultService = inferenceResultService;
    }
    async getDataByDate(date) {
        return this.inferenceResultService.getDataByDate(date);
    }
    async getDataByPlate(plate) {
        return this.inferenceResultService.getDataByPlate(plate);
    }
    async getCountByDate(date) {
        return this.inferenceResultService.getCountViolators(date);
    }
    async getDataByFeature(date, cam, vehicle_category, search_plate) {
        return this.inferenceResultService.getDataByFeature(date, cam, vehicle_category, search_plate);
    }
    async getDataPlate(plate, id) {
        return this.inferenceResultService.getDetailViolator(plate);
    }
    async updatePlateNumber(id, oldPlate, newPlate, req) {
        const decodedOldPlate = decodeURIComponent(oldPlate);
        const userId = req.user['sub'];
        return this.inferenceResultService.updatePlate(id, decodedOldPlate, newPlate, userId);
    }
};
exports.InferenceResultController = InferenceResultController;
__decorate([
    (0, common_1.Get)('by-date'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, verify_guard_1.VerifyGuard),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InferenceResultController.prototype, "getDataByDate", null);
__decorate([
    (0, common_1.Get)('by-plate'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, verify_guard_1.VerifyGuard),
    __param(0, (0, common_1.Query)('plate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InferenceResultController.prototype, "getDataByPlate", null);
__decorate([
    (0, common_1.Get)('by-date/count'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, verify_guard_1.VerifyGuard),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InferenceResultController.prototype, "getCountByDate", null);
__decorate([
    (0, common_1.Get)('by-feature'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, verify_guard_1.VerifyGuard),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('cam')),
    __param(2, (0, common_1.Query)('vehicle_category')),
    __param(3, (0, common_1.Query)('search_plate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], InferenceResultController.prototype, "getDataByFeature", null);
__decorate([
    (0, common_1.Get)('detail-violators/'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, verify_guard_1.VerifyGuard),
    __param(0, (0, common_1.Query)('plate')),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], InferenceResultController.prototype, "getDataPlate", null);
__decorate([
    (0, common_1.Patch)('update-plate/'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, verify_guard_1.VerifyGuard),
    __param(0, (0, common_1.Body)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('old-plate')),
    __param(2, (0, common_1.Body)('new-plate')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], InferenceResultController.prototype, "updatePlateNumber", null);
exports.InferenceResultController = InferenceResultController = __decorate([
    (0, common_1.Controller)('inference-result'),
    __metadata("design:paramtypes", [inference_result_service_1.InferenceResultService])
], InferenceResultController);
//# sourceMappingURL=inference-result.controller.js.map