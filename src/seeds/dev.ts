import { createConnection, getRepository } from 'typeorm';

import { User } from '../entities/user';

(async () => {
  await createConnection();
  const userRepository = getRepository(User);

  const user: User = {
    username: 'romain',
    password: '123456',
  };

  await userRepository.insert(user);
})();
