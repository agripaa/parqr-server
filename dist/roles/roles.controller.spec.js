"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const roles_controller_1 = require("./roles.controller");
describe('RolesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [roles_controller_1.RolesController],
        }).compile();
        controller = module.get(roles_controller_1.RolesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=roles.controller.spec.js.map