import { MyModel } from '../models';
import { SampleService } from '../services';
import { castT, implementsTKeys } from '../utils';
import { Controller } from './Controller';
import { InvalidRequestError } from './errors';
import { badRequest, HttpRequest, HttpResponse, ok } from './Http';

export class SampleController implements Controller {
  constructor(private readonly sampleService: SampleService) {}

  async handle(httpRequest?: HttpRequest): Promise<HttpResponse<number>> {
    const data = httpRequest?.query;

    if (!implementsTKeys<MyModel>(data, ['id', 'code'])) {
      return badRequest(new InvalidRequestError());
    }

    return ok(this.sampleService.returnSomething(castT<MyModel>(data)));
  }
}
