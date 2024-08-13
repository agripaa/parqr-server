"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const activity_user_controller_1 = require("./activity-user.controller");
describe('ActivityUserController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [activity_user_controller_1.ActivityUserController],
        }).compile();
        controller = module.get(activity_user_controller_1.ActivityUserController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=activity-user.controller.spec.js.map