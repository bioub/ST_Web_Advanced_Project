import { NextFunction, Request, Response } from 'express';

import * as model from '../models/answer';

export async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const answer = await model.create(req.body);
    res.json(answer);
  } catch (err) {
    next(err);
  }
}
