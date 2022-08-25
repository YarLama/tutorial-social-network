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
exports.AddUserRoleDto = void 0;
const class_validator_1 = require("class-validator");
class AddUserRoleDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: "Could be string parameter" }),
    __metadata("design:type", String)
], AddUserRoleDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "Could be integer parameter" }),
    __metadata("design:type", Number)
], AddUserRoleDto.prototype, "userId", void 0);
exports.AddUserRoleDto = AddUserRoleDto;
//# sourceMappingURL=add_role_user.dto.js.map