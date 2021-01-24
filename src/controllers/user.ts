import { NextFunction, Request, Response } from 'express';

import * as User from '../models/user';

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

export async function me(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = await User.getCurrent(req.headers.authorization);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
