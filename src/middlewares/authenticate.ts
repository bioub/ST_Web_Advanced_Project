import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import config from '../config';

function authenticate(req: Request, res: Response, next: NextFunction): void {
  if (verify(req.headers.authorization, config.jwtSecret)) {
    return next();
  }

  res.statusCode = 401;
  res.json({
    msg: 'Unauthorized',
  });
}

export default authenticate;
