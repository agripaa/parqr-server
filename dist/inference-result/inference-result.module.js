"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InferenceResultModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const interfaceResult_entity_1 = require("../entities/interfaceResult.entity");
const inference_result_service_1 = require("./inference-result.service");
const inference_result_controller_1 = require("./inference-result.controller");
const activity_user_module_1 = require("../activity-user/activity-user.module");
const otp_module_1 = require("../otp/otp.module");
const otpCode_entity_1 = require("../entities/otpCode.entity");
const auth_module_1 = require("../auth/auth.module");
let InferenceResultModule = class InferenceResultModule {
};
exports.InferenceResultModule = InferenceResultModule;
exports.InferenceResultModule = InferenceResultModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([interfaceResult_entity_1.InferenceResult, otpCode_entity_1.OtpCode]),
            activity_user_module_1.ActivityUserModule,
            otp_module_1.OtpModule,
            auth_module_1.AuthModule
        ],
        providers: [inference_result_service_1.InferenceResultService],
        controllers: [inference_result_controller_1.InferenceResultController],
        exports: [inference_result_service_1.InferenceResultService]
    })
], InferenceResultModule);
//# sourceMappingURL=inference-result.module.js.map