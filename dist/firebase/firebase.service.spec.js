"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const firebase_service_1 = require("./firebase.service");
describe('FirebaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [firebase_service_1.FirebaseService],
        }).compile();
        service = module.get(firebase_service_1.FirebaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=firebase.service.spec.js.map