import { scryptSync } from 'crypto';

import { decode, sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { User } from '../entities/user';

interface Credentials {
  username: string;
  password: string;
}

async function login(credentials: Credentials): Promise<string | null> {
  const userRepository = getRepository(User);

  const password = scryptSync(credentials.password, credentials.username + '|' + process.env.SECRET, 32).toString(
    'hex',
  );

  const user = await userRepository.findOne({
    where: { username: credentials.username, password },
  });

  if (user) {
    const token = sign({ username: user.username }, process.env.SECRET, {
      expiresIn: '1d',
    });
    return token;
  }

  return null;
}

async function getCurrent(token: string): Promise<User> {
  const payload = decode(token) as { [key: string]: any };

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    select: ['id', 'username'],
    where: { username: payload.username },
  });

  return user;
}

async function create(data: Credentials): Promise<User> {
  const userRepository = getRepository(User);

  const existing = await userRepository.findOne({
    where: { username: data.username },
  });

  if (existing) {
    throw new Error('username already exists');
  }

  data.password = scryptSync(data.password, data.username + '|' + process.env.SECRET, 32).toString('hex');

  const { identifiers } = await userRepository.insert(data);

  return { id: Number(identifiers[0]), ...data };
}

export { login, getCurrent, create };
