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
exports.OwnerSignInPayloadDto = exports.OperatorSignPayloadDto = exports.OwnerPayloadDto = exports.OperatorPayloadDto = void 0;
const class_validator_1 = require("class-validator");
class AuthPayloadDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthPayloadDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthPayloadDto.prototype, "password", void 0);
class OperatorPayloadDto extends AuthPayloadDto {
}
exports.OperatorPayloadDto = OperatorPayloadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatorPayloadDto.prototype, "NIK", void 0);
class OwnerPayloadDto extends AuthPayloadDto {
}
exports.OwnerPayloadDto = OwnerPayloadDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OwnerPayloadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OwnerPayloadDto.prototype, "username", void 0);
class OperatorSignPayloadDto extends AuthPayloadDto {
}
exports.OperatorSignPayloadDto = OperatorSignPayloadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatorSignPayloadDto.prototype, "NIK", void 0);
class OwnerSignInPayloadDto extends AuthPayloadDto {
}
exports.OwnerSignInPayloadDto = OwnerSignInPayloadDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OwnerSignInPayloadDto.prototype, "email", void 0);
//# sourceMappingURL=auth.dto.js.map