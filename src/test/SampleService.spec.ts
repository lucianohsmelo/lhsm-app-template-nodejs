import { MyModel } from '../main/models';
import { SampleService } from '../main/services';

describe('SampleService tests', () => {
  let service: SampleService;

  beforeEach(() => (service = new SampleService()));
  test('Do something test', () => {
    expect(() => service.doSomething()).not.toThrow();
  });

  test('Return Something test', () => {
    const model: MyModel = { id: 1, code: 'code' };

    expect(service.returnSomething(model)).toBe(model);
  });
});
