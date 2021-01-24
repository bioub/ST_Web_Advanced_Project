import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

function authenticate(req: Request, res: Response, next: NextFunction): void {
  if (verify(req.headers.authorization, process.env.JWT_SECRET)) {
    return next();
  }

  res.statusCode = 401;
  res.json({
    msg: 'Unauthorized',
  });
}

export default authenticate;
