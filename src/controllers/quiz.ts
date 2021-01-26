import { NextFunction, Request, Response } from 'express';

import * as model from '../models/quiz';
import { getCurrent } from '../models/user';

export async function list(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const currentUser = await getCurrent(req.headers.authorization);
    const quizzes = await model.findByUser(currentUser);
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const quiz = await model.create(req.body, req.headers.authorization);
    res.json(quiz);
  } catch (err) {
    next(err);
  }
}

export async function activate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const quiz = await model.activate(req.params.id, req.headers.authorization);

    if (!quiz) {
      req.notFoundReason = 'Quiz not found';
      return next();
    }

    res.json(quiz);
  } catch (err) {
    next(err);
  }
}

export async function active(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const quiz = await model.findActive(req.query.username as string);

    if (!quiz) {
      req.notFoundReason = 'Quiz not found';
      return next();
    }

    res.json(quiz);
  } catch (err) {
    next(err);
  }
}
