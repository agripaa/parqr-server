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
exports.OtpCode = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let OtpCode = class OtpCode {
};
exports.OtpCode = OtpCode;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OtpCode.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], OtpCode.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false, default: () => "NOW()" }),
    __metadata("design:type", Date)
], OtpCode.prototype, "expired", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OtpCode.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.otpCodes),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", users_entity_1.Users)
], OtpCode.prototype, "userId", void 0);
exports.OtpCode = OtpCode = __decorate([
    (0, typeorm_1.Entity)('otp_code')
], OtpCode);
//# sourceMappingURL=otpCode.entity.js.map