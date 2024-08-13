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
exports.ActivityUser = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const interfaceResult_entity_1 = require("./interfaceResult.entity");
let ActivityUser = class ActivityUser {
};
exports.ActivityUser = ActivityUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ActivityUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => interfaceResult_entity_1.InferenceResult, inferenceResult => inferenceResult.activities),
    (0, typeorm_1.JoinColumn)({ name: 'inference_result_id' }),
    __metadata("design:type", interfaceResult_entity_1.InferenceResult)
], ActivityUser.prototype, "inferenceResult", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityUser.prototype, "oldPlate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityUser.prototype, "newPlate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ActivityUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ActivityUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, user => user.activities),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.Users)
], ActivityUser.prototype, "user", void 0);
exports.ActivityUser = ActivityUser = __decorate([
    (0, typeorm_1.Entity)('activity_user')
], ActivityUser);
//# sourceMappingURL=activityUser.entity.js.map