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
exports.InferenceResultService = void 0;
const common_1 = require("@nestjs/common");
const interfaceResult_entity_1 = require("../entities/interfaceResult.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const activity_user_service_1 = require("../activity-user/activity-user.service");
let InferenceResultService = class InferenceResultService {
    constructor(inferenceRepository, activityUserService) {
        this.inferenceRepository = inferenceRepository;
        this.activityUserService = activityUserService;
    }
    async getDataByDate(date) {
        try {
            const query = this.inferenceRepository.createQueryBuilder('inference')
                .innerJoinAndSelect('inference.imageDetection', 'imageDetection')
                .where("JSON_EXTRACT(inference.predictions, '$.date') = :date", { date });
            const data = await query.getMany();
            if (data.length === 0) {
                throw new common_1.HttpException('No data found for the given date', common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to retrieve data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCountViolators(date) {
        try {
            const query = this.inferenceRepository.createQueryBuilder('inference')
                .innerJoinAndSelect('inference.imageDetection', 'imageDetection')
                .where("JSON_EXTRACT(inference.predictions, '$.date') =:date", { date });
            const data = await query.getMany();
            if (date.length === 0) {
                throw new common_1.HttpException('No data found for the given plate', common_1.HttpStatus.NOT_FOUND);
            }
            return { status: 200, data_length: { length_violatiors_data: data.length }, data };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to retrieve data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDetailViolator(plate, id) {
        try {
            const query = this.inferenceRepository.createQueryBuilder('inference')
                .innerJoinAndSelect('inference.imageDetection', 'imageDetection')
                .where("JSON_EXTRACT(inference.predictions, '$.plate') = :plate", { plate });
            if (id) {
                query.andWhere("JSON_EXTRACT(inference.id, '$.id') = :id", { id });
            }
            const data = await query.getOne();
            if (!data) {
                throw new common_1.HttpException('No data found for the given plate and id', common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to retrieve data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDataByFeature(date, cam, vehicle_category, search_plate) {
        try {
            const query = this.inferenceRepository.createQueryBuilder('inference')
                .innerJoinAndSelect('inference.imageDetection', 'imageDetection');
            if (date) {
                query.andWhere("JSON_EXTRACT(inference.predictions, '$.date') = :date", { date });
            }
            if (cam) {
                query.andWhere("JSON_EXTRACT(inference.predictions, '$.cam') = :cam", { cam });
            }
            if (vehicle_category) {
                query.andWhere("JSON_EXTRACT(inference.predictions, '$.vehicle_category') = :vehicle_category", { vehicle_category });
            }
            if (search_plate) {
                query.andWhere("JSON_EXTRACT(inference.predictions, '$.plate') LIKE :search_plate", { search_plate: `%${search_plate}%` });
            }
            const data = await query.getMany();
            if (data.length === 0) {
                return new common_1.HttpException('No data found for the given features', common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to retrieve data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDataByPlate(plate) {
        try {
            const query = this.inferenceRepository.createQueryBuilder('inference')
                .innerJoinAndSelect('inference.imageDetection', 'imageDetection')
                .where("JSON_EXTRACT(inference.predictions, '$.plate') = :plate", { plate });
            const data = await query.getMany();
            if (!data) {
                throw new common_1.HttpException('Data not found', common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to retrieve data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePlate(id, oldPlate, newPlate, userId) {
        try {
            const existingRecord = await this.inferenceRepository.createQueryBuilder('inference')
                .select('inference.change_status')
                .where('inference.id = :id', { id })
                .getOne();
            if (existingRecord.change_status === true) {
                return new common_1.HttpException('Plate number cannot be changed', common_1.HttpStatus.NOT_FOUND);
            }
            const result = await this.inferenceRepository.createQueryBuilder()
                .update(interfaceResult_entity_1.InferenceResult)
                .set({
                predictions: () => `JSON_SET(predictions, '$.plate', '${newPlate}')`,
                change_status: true
            })
                .where("id = :id", { id })
                .andWhere("JSON_EXTRACT(predictions, '$.plate') = :oldPlate", { oldPlate })
                .execute();
            if (result.affected === 0) {
                return new common_1.HttpException('Data not found or plate number not matched', common_1.HttpStatus.NOT_FOUND);
            }
            await this.activityUserService.createActivityUser(userId, id, oldPlate, newPlate);
            return { status: 201, message: 'Plate number updated successfully' };
        }
        catch (error) {
            return new common_1.HttpException('Failed to update plate number', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.InferenceResultService = InferenceResultService;
exports.InferenceResultService = InferenceResultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(interfaceResult_entity_1.InferenceResult)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        activity_user_service_1.ActivityUserService])
], InferenceResultService);
//# sourceMappingURL=inference-result.service.js.map