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
exports.ActivityUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activityUser_entity_1 = require("../entities/activityUser.entity");
const typeorm_2 = require("typeorm");
let ActivityUserService = class ActivityUserService {
    constructor(activityUserRepository) {
        this.activityUserRepository = activityUserRepository;
    }
    async createActivityUser(userId, inferenceResultId, oldPlate, newPlate) {
        try {
            const activityUser = await this.activityUserRepository.create({
                user: { id: userId },
                inferenceResult: { id: inferenceResultId },
                oldPlate,
                newPlate,
            });
            return this.activityUserRepository.save(activityUser);
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getActivityUser(res) {
        try {
            const activityUsers = await this.activityUserRepository.find({ relations: ['user', 'user.image_profile', 'inferenceResult'] });
            if (activityUsers.length === 0) {
                return res.status(404).json({ status: 404, msg: "activity user is null" });
            }
            return res.status(200).json({ status: 200, data: activityUsers });
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ActivityUserService = ActivityUserService;
exports.ActivityUserService = ActivityUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activityUser_entity_1.ActivityUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActivityUserService);
//# sourceMappingURL=activity-user.service.js.map