"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_user_service_1 = require("./activity-user.service");
const activityUser_entity_1 = require("../entities/activityUser.entity");
const activity_user_controller_1 = require("./activity-user.controller");
let ActivityUserModule = class ActivityUserModule {
};
exports.ActivityUserModule = ActivityUserModule;
exports.ActivityUserModule = ActivityUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([activityUser_entity_1.ActivityUser])],
        providers: [activity_user_service_1.ActivityUserService],
        controllers: [activity_user_controller_1.ActivityUserController],
        exports: [activity_user_service_1.ActivityUserService],
    })
], ActivityUserModule);
//# sourceMappingURL=activity-user.module.js.map