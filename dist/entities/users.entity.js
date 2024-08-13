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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const roles_entity_1 = require("./roles.entity");
const class_validator_1 = require("class-validator");
const profileUser_entity_1 = require("./profileUser.entity");
const otpCode_entity_1 = require("./otpCode.entity");
const activityUser_entity_1 = require("./activityUser.entity");
let Users = class Users {
    generateUuid() {
        this.uuid = (0, uuid_1.v4)();
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 36, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, unique: true, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "NIK", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true, nullable: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roles_entity_1.RoleUser, roleUser => roleUser.users),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", roles_entity_1.RoleUser)
], Users.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profileUser_entity_1.ProfileUser, profileUser => profileUser.users),
    (0, typeorm_1.JoinColumn)({ name: 'image_profile' }),
    __metadata("design:type", profileUser_entity_1.ProfileUser)
], Users.prototype, "image_profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => otpCode_entity_1.OtpCode, otpCode => otpCode.userId),
    __metadata("design:type", Array)
], Users.prototype, "otpCodes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activityUser_entity_1.ActivityUser, activityUser => activityUser.user),
    __metadata("design:type", Array)
], Users.prototype, "activities", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Users.prototype, "generateUuid", null);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
//# sourceMappingURL=users.entity.js.map