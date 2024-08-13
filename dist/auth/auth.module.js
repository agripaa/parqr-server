"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const roles_guard_1 = require("./guards/roles.guard");
const roles_entity_1 = require("../entities/roles.entity");
const profileUser_entity_1 = require("../entities/profileUser.entity");
const otpCode_entity_1 = require("../entities/otpCode.entity");
const otp_module_1 = require("../otp/otp.module");
const verify_guard_1 = require("./guards/verify.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'IOJ2R39UjjdouU9JU999_349IDFuhf0HISDHFOQHF',
                signOptions: { expiresIn: '1d' },
            }),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users, roles_entity_1.RoleUser, profileUser_entity_1.ProfileUser, otpCode_entity_1.OtpCode]),
            otp_module_1.OtpModule
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard, verify_guard_1.VerifyGuard],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, verify_guard_1.VerifyGuard]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map