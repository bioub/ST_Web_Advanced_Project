import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { mocked } from 'ts-jest/utils';

import authenticate from './authenticate';

jest.mock('jsonwebtoken');
const mockedJwt = mocked(jwt, true);

test('authenticate calls next if token is valid', () => {
  const validToken = '1234';
  const nextSpy = jest.fn();

  mockedJwt.verify.mockImplementation(() => true);

  const fakeRequest = { headers: { authorization: validToken } } as Partial<Request>;
  const fakeResponse = {} as Partial<Response>;

  authenticate(fakeRequest as Request, fakeResponse as Response, nextSpy);

  expect(nextSpy).toHaveBeenCalled();
});

test('authenticate calls res.json if token not valid', () => {
  const invalidToken = '9876';
  const nextSpy = jest.fn();

  mockedJwt.verify.mockImplementation(() => false);

  const fakeRequest = { headers: { authorization: invalidToken } } as Partial<Request>;
  const fakeResponse = { json: jest.fn() } as Partial<Response>;

  authenticate(fakeRequest as Request, fakeResponse as Response, nextSpy);

  expect(fakeResponse.statusCode).toBe(401);
  expect(fakeResponse.json).toHaveBeenCalledWith({
    msg: 'Unauthorized',
  });
});
