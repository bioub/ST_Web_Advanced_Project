import { NextFunction, Request, Response } from 'express';

import * as User from '../models/user';

/**
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @param next {import('express').NextFunction}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const token = await User.login(req.body);

    if (!token) {
      res.statusCode = 400;
      return res.json({
        msg: 'Wrong username/password',
      });
    }

    res.json({ token });
  } catch (err) {
    next(err);
  }
}
