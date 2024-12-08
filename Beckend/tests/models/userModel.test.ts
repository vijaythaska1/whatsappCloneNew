import  User  from '../../src/models/userModel';

describe('User Model', () => {
  it('should create a new user with valid data', () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com'
    };
    const user = new User(userData);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it('should validate required fields', () => {
    const userData = {};
    expect(() => new User(userData)).toThrow();
  });
});