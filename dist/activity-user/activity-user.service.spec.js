"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const activity_user_service_1 = require("./activity-user.service");
describe('ActivityUserService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [activity_user_service_1.ActivityUserService],
        }).compile();
        service = module.get(activity_user_service_1.ActivityUserService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=activity-user.service.spec.js.map