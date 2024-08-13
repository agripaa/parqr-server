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
exports.DetectionController = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase.service");
let DetectionController = class DetectionController {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async saveDetectionResult(data) {
        try {
            await this.firebaseService.saveDetectionResult(data);
            return { message: 'Detection result saved successfully' };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to save detection result', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DetectionController = DetectionController;
__decorate([
    (0, common_1.Post)('result'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DetectionController.prototype, "saveDetectionResult", null);
exports.DetectionController = DetectionController = __decorate([
    (0, common_1.Controller)('detection'),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], DetectionController);
//# sourceMappingURL=detection.controller.js.map