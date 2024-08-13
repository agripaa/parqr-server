"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseServiceModule = void 0;
const common_1 = require("@nestjs/common");
const firebase_module_1 = require("./firebase.module");
const firebase_service_1 = require("./firebase.service");
const typeorm_1 = require("@nestjs/typeorm");
const imageDetection_entity_1 = require("../entities/imageDetection.entity");
const interfaceResult_entity_1 = require("../entities/interfaceResult.entity");
const vehicleDetail_entity_1 = require("../entities/vehicleDetail.entity");
const firebase_controller_1 = require("./firebase.controller");
const activityUser_entity_1 = require("../entities/activityUser.entity");
let FirebaseServiceModule = class FirebaseServiceModule {
};
exports.FirebaseServiceModule = FirebaseServiceModule;
exports.FirebaseServiceModule = FirebaseServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            firebase_module_1.FirebaseModule,
            typeorm_1.TypeOrmModule.forFeature([imageDetection_entity_1.ImageDetection, interfaceResult_entity_1.InferenceResult, vehicleDetail_entity_1.VehicleDetail, activityUser_entity_1.ActivityUser])
        ],
        providers: [firebase_service_1.FirebaseService],
        controllers: [firebase_controller_1.FirebaseController],
        exports: [firebase_service_1.FirebaseService],
    })
], FirebaseServiceModule);
//# sourceMappingURL=firebase.service.module.js.map