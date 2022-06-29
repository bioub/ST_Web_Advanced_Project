import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '../app';
import * as userModel from '../models/user';

jest.mock('jsonwebtoken');
jest.mock('../models/user');
const mockedJwt = jest.mocked(jwt, true);
const mockedUserModel = jest.mocked(userModel, true);

test('GET /api/users/me', async () => {
  mockedJwt.verify.mockImplementation(() => true);
  mockedJwt.decode.mockImplementation(() => ({ username: 'test' }));
  mockedUserModel.getCurrent.mockResolvedValue({ id: 1, username: 'test', password: '', quizzes: [] });
  const res = await request(app).get('/api/users/me');

  expect(res.status).toBe(200);
  expect(res.body).toEqual({ id: 1, username: 'test', password: '', quizzes: [] });
});

test('POST /api/users', async () => {
  mockedJwt.verify.mockImplementation(() => true);

  mockedUserModel.create.mockResolvedValue({ id: 1, username: 'test', password: '' });
  const res = await request(app).post('/api/users/register').send({ username: 'test', password: '' });

  expect(res.status).toBe(200);
  expect(res.body).toEqual({ id: 1, username: 'test', password: '' });
});
