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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InferenceResult = void 0;
const typeorm_1 = require("typeorm");
const imageDetection_entity_1 = require("./imageDetection.entity");
const activityUser_entity_1 = require("./activityUser.entity");
let InferenceResult = class InferenceResult {
};
exports.InferenceResult = InferenceResult;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InferenceResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], InferenceResult.prototype, "predictions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], InferenceResult.prototype, "processed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], InferenceResult.prototype, "change_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => imageDetection_entity_1.ImageDetection, imageDetection => imageDetection.inferenceResults),
    (0, typeorm_1.JoinColumn)({ name: 'image_detection_id' }),
    __metadata("design:type", imageDetection_entity_1.ImageDetection)
], InferenceResult.prototype, "imageDetection", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activityUser_entity_1.ActivityUser, activityUser => activityUser.inferenceResult),
    __metadata("design:type", Array)
], InferenceResult.prototype, "activities", void 0);
exports.InferenceResult = InferenceResult = __decorate([
    (0, typeorm_1.Entity)('inference_results')
], InferenceResult);
//# sourceMappingURL=interfaceResult.entity.js.map