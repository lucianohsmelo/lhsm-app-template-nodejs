import { Router } from 'express';

import { adaptRoute } from '../adapters';
import { SampleController } from '../controllers';
import { SampleService } from '../services';

const sampleService = new SampleService();

export default (router: Router): void => {
  router.get('/', adaptRoute(new SampleController(sampleService)));
};
