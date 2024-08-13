"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const inference_result_controller_1 = require("./inference-result.controller");
describe('InferenceResultController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [inference_result_controller_1.InferenceResultController],
        }).compile();
        controller = module.get(inference_result_controller_1.InferenceResultController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=inference-result.controller.spec.js.map