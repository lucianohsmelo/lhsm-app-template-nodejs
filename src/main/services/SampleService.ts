import { MyModel } from '../models';

export class SampleService {
  doSomething(): void {
    console.log('Do something');
  }

  returnSomething(model: MyModel): MyModel {
    return model;
  }
}
