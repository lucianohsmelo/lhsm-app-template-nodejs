import { Request, Response } from 'express';

import { adaptRoute } from '../main/adapters';
import { Controller } from '../main/controllers/Controller';
import { badRequest, HttpRequest, ok } from '../main/controllers/Http';

describe('Adapters Tests', () => {
  describe('Express adapter tests', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockRequest = (query?: Record<string, any>, params?: Record<string, any>, body?: any): Partial<Request> => {
      return { query, params, body };
    };

    const mockResponse = (): Partial<Response> => {
      return { status: jest.fn(), send: jest.fn(), json: jest.fn() };
    };

    let controller: Controller;

    test('Send expected resolved string value and status code 200', async () => {
      const expectedResponse = 'Some response';

      controller = { handle: jest.fn().mockResolvedValue(ok(expectedResponse)) };

      const reqMock = mockRequest();
      const resMock = mockResponse();

      await adaptRoute(controller)(reqMock as Request, resMock as Response);

      expect(controller.handle).toBeCalledTimes(1);
      expect(controller.handle).toBeCalledWith({ query: undefined, params: undefined, body: undefined });
      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(200);
      expect(resMock.send).toBeCalledTimes(1);
      expect(resMock.send).toBeCalledWith(expectedResponse);
    });

    test('Send expected error message and status code 500', async () => {
      const expectedResponse = 'Expected error message';
      const expectedError = new Error(expectedResponse);

      controller = {
        handle: () => {
          throw expectedError;
        },
      };

      const reqMock = mockRequest();
      const resMock = mockResponse();

      await adaptRoute(controller)(reqMock as Request, resMock as Response);

      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.send).toBeCalledTimes(1);
      expect(resMock.send).toBeCalledWith(expectedResponse);
      expect(resMock.json).not.toBeCalled();
      expect(controller.handle).toThrowError(expectedError);
    });

    test('Send expected reject message and status code 500', async () => {
      const expectedResponse = 'Expected reject message';

      controller = { handle: jest.fn().mockRejectedValue(expectedResponse) };

      const reqMock = mockRequest();
      const resMock = mockResponse();

      await adaptRoute(controller)(reqMock as Request, resMock as Response);

      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(500);
      expect(resMock.send).toBeCalledTimes(1);
      expect(resMock.send).toBeCalledWith(expectedResponse);
      expect(resMock.json).not.toBeCalled();
      expect(controller.handle).toBeCalledTimes(1);
      expect(controller.handle).rejects.toBe(expectedResponse);
    });

    test('Send expected error message and status code 400', async () => {
      const expectedResponse = 'Some error message';
      const error = new Error(expectedResponse);

      controller = { handle: jest.fn().mockResolvedValue(badRequest(error)) };

      const reqMock = mockRequest();
      const resMock = mockResponse();

      await adaptRoute(controller)(reqMock as Request, resMock as Response);

      expect(resMock.status).toBeCalledTimes(1);
      expect(resMock.status).toBeCalledWith(400);
      expect(resMock.send).toBeCalledTimes(1);
      expect(resMock.send).toBeCalledWith(expectedResponse);
      expect(resMock.json).not.toBeCalled();
      expect(controller.handle).toBeCalledTimes(1);
    });

    test('Send json when http response data is a object', async () => {
      const expectedResponse = { a: 1, b: 2 };

      controller = { handle: jest.fn().mockResolvedValue(ok(expectedResponse)) };

      const reqMock = mockRequest();
      const resMock = mockResponse();

      await adaptRoute(controller)(reqMock as Request, resMock as Response);
      expect(resMock.send).not.toBeCalled();
      expect(resMock.json).toBeCalledTimes(1);
      expect(resMock.json).toBeCalledWith(expectedResponse);
    });

    test('Called controller with expected parameters', async () => {
      const query = { a: 1 };
      const params = { b: 2 };
      const body = ['a', 'b', 1, 2];

      const httpRequest: HttpRequest = { query, params, body };

      controller = { handle: jest.fn() };
      const reqMock = mockRequest(query, params, body);
      const resMock = mockResponse();

      await adaptRoute(controller)(reqMock as Request, resMock as Response);

      expect(controller.handle).toBeCalledWith(httpRequest);
    });
  });
});
