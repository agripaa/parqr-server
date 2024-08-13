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
exports.ProfileUser = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const class_validator_1 = require("class-validator");
let ProfileUser = class ProfileUser {
};
exports.ProfileUser = ProfileUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProfileUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProfileUser.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProfileUser.prototype, "name_image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], ProfileUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], ProfileUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_entity_1.Users, (user) => user.image_profile),
    __metadata("design:type", Array)
], ProfileUser.prototype, "users", void 0);
exports.ProfileUser = ProfileUser = __decorate([
    (0, typeorm_1.Entity)('profile_user')
], ProfileUser);
//# sourceMappingURL=profileUser.entity.js.map