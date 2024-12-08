import { Request, Response } from 'express';
import { createUser } from '../../src/controllers/userController';

describe('createUser', () => {
  it('should create a user with name and email', async () => {
    const mockRequest = {
      body: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await createUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com'
        })
      })
    );
  });
});