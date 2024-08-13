"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const detection_controller_1 = require("./detection.controller");
describe('FirebaseController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [detection_controller_1.DetectionController],
        }).compile();
        controller = module.get(detection_controller_1.DetectionController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=firebase.controller.spec.js.map