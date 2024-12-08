import { Request, Response } from 'express';
import { createUser } from '../../src/controllers/userController';

describe('User Controller', () => {
  it('should create a new user', async () => {
    const mockRequest = {
      body: {
        name: 'Test User',
        email: 'test@example.com'
      }
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await createUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});