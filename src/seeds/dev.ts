import { scryptSync } from 'crypto';
import { promises } from 'fs';

import { createConnection, getRepository } from 'typeorm';

import { User } from '../entities/user';

(async () => {
  await createConnection();
  const userRepository = getRepository(User);
  await userRepository.clear();

  const user: User = {
    username: 'romain',
    password: '123456',
  };

  user.password = scryptSync(user.password, user.username + '|' + process.env.SECRET, 32).toString('hex');

  await userRepository.insert(user);
})();
