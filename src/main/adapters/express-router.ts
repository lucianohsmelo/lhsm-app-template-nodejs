import { Request, Response } from 'express';

import { Controller } from '../controllers/Controller';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<void> => {
    const query: Record<string, unknown> = req.query;
    const params: Record<string, unknown> = req.params;
    const body = req.body;

    try {
      const httpResponse = await controller.handle({ query, params, body });

      const data = httpResponse.data;

      res.status(httpResponse.statusCode);

      if (typeof data === 'string') {
        res.send(data);
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500);
      let errorMessage = 'Internal server error';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      res.send(errorMessage);
    }
  };
};
