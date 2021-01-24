import * as uuid from 'uuid';

const tokens = ['d4973653-9895-4123-a7dd-3e1387d0fbde'];

const user = {
  username: 'romain',
  password: '123456',
};

interface Credentials {
  username: string;
  password: string;
}

function login(credentials: Credentials): Promise<string | null> {
  if (credentials.username === user.username && credentials.password === user.password) {
    const token = uuid.v4();
    tokens.push(token);
    return Promise.resolve(token);
  }

  return Promise.resolve(null);
}

export { login, tokens };
