import { InvalidRequestError } from '../main/controllers/errors';
import { SampleController } from '../main/controllers/SampleController';
import { SampleService } from '../main/services/SampleService';

jest.mock('../main/services/SampleService');

const SampleServiceMock = SampleService as jest.MockedClass<typeof SampleService>;

describe('SampleController Test', () => {
  let controller: SampleController;

  beforeEach(() => (controller = new SampleController(new SampleServiceMock())));

  test('Return status code 400 for bad request', async () => {
    const response = await controller.handle({ query: { id: 1 }, params: {}, body: null });

    expect(response.statusCode).toBe(400);
    expect(response.data).toBe(new InvalidRequestError().message);
    expect(SampleServiceMock.prototype.returnSomething).not.toBeCalled();
  });

  test('Verify if SampleService method is called correctly', async () => {
    SampleServiceMock.prototype.returnSomething.mockReturnValue({ id: 1, code: 'code' });

    const response = await controller.handle({ query: { id: 1, code: 2 }, params: {}, body: null });

    expect(SampleServiceMock.prototype.returnSomething).toBeCalled();
    expect(SampleServiceMock.prototype.returnSomething).toHaveBeenCalledWith({ id: 1, code: 2 });
    expect(SampleServiceMock.prototype.returnSomething).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual({ id: 1, code: 'code' });
  });
});
