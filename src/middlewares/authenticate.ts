import { NextFunction, Request, Response } from 'express';

import { tokens } from '../models/user';

/**
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @param next {import('express').NextFunction}
 */
function authenticate(req: Request, res: Response, next: NextFunction): void {
  if (tokens.includes(req.headers.authorization)) {
    return next();
  }

  res.statusCode = 401;
  res.json({
    msg: 'Unauthorized',
  });
}

export default authenticate;
