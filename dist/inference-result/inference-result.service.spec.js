"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const inference_result_service_1 = require("./inference-result.service");
describe('InferenceResultService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [inference_result_service_1.InferenceResultService],
        }).compile();
        service = module.get(inference_result_service_1.InferenceResultService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=inference-result.service.spec.js.map