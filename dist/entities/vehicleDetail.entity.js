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
exports.VehicleDetail = void 0;
const typeorm_1 = require("typeorm");
const interfaceResult_entity_1 = require("./interfaceResult.entity");
let VehicleDetail = class VehicleDetail {
};
exports.VehicleDetail = VehicleDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VehicleDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => interfaceResult_entity_1.InferenceResult),
    (0, typeorm_1.JoinColumn)({ name: 'inference_id' }),
    __metadata("design:type", interfaceResult_entity_1.InferenceResult)
], VehicleDetail.prototype, "inference", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VehicleDetail.prototype, "vehicle_plate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleDetail.prototype, "vehicle_plate_new", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleDetail.prototype, "vehicle_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleDetail.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleDetail.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleDetail.prototype, "camera", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], VehicleDetail.prototype, "change_plate", void 0);
exports.VehicleDetail = VehicleDetail = __decorate([
    (0, typeorm_1.Entity)('vehicle_details')
], VehicleDetail);
//# sourceMappingURL=vehicleDetail.entity.js.map