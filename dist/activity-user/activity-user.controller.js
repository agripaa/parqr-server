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
exports.ActivityUserController = void 0;
const common_1 = require("@nestjs/common");
const activity_user_service_1 = require("./activity-user.service");
let ActivityUserController = class ActivityUserController {
    constructor(activityUserService) {
        this.activityUserService = activityUserService;
    }
    async getAllActivity(res) {
        return this.activityUserService.getActivityUser(res);
    }
};
exports.ActivityUserController = ActivityUserController;
__decorate([
    (0, common_1.Get)('/get-all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityUserController.prototype, "getAllActivity", null);
exports.ActivityUserController = ActivityUserController = __decorate([
    (0, common_1.Controller)('activity-user'),
    __metadata("design:paramtypes", [activity_user_service_1.ActivityUserService])
], ActivityUserController);
//# sourceMappingURL=activity-user.controller.js.map