import 'reflect-metadata';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import answerRoutes from './routes/answer';
import quizRoutes from './routes/quiz';
import userRoutes from './routes/user';

const app = express();

// Log Middleware
app.use(morgan('dev'));

// CORS Middleware (cross-domain requests)
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/answers', answerRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 404;
  res.json({
    msg: req.notFoundReason || 'Not Found',
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('/api', (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 500;
  res.json({
    msg: err.message,
  });
});

export default app;
