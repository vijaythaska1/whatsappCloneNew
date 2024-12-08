"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../src/models/userModel");
describe('User Model', () => {
    it('should create a new user with valid data', () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com'
        };
        const user = new userModel_1.User(userData);
        expect(user.name).toBe(userData.name);
        expect(user.email).toBe(userData.email);
    });
    it('should validate required fields', () => {
        const userData = {};
        expect(() => new userModel_1.User(userData)).toThrow();
    });
});
//# sourceMappingURL=userModel.test.js.map