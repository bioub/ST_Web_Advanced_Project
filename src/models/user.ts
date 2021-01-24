import { decode, sign } from 'jsonwebtoken';

import config from '../config';

const user = {
  username: 'romain',
  password: '123456',
};

interface Credentials {
  username: string;
  password: string;
}

async function login(credentials: Credentials): Promise<string | null> {
  if (credentials.username === user.username && credentials.password === user.password) {
    const token = sign({ username: user.username }, config.jwtSecret, {
      expiresIn: '1d',
    });
    return token;
  }

  return null;
}

async function getCurrent(token: string): Promise<any> {
  const payload = decode(token) as { [key: string]: any };

  return {
    username: payload.username,
  };
}

export { login, getCurrent };
