import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosResponse } from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import { login } from './api';
import Login from './Login';

// mocks all exports from ./api
jest.mock('./api');

// this helps to get correct TS type on mockedLogin
const mockedLogin = mocked(login);

test('Login with valid credentials', async () => {
  // we create a fake props object with history.push as a mock function
  const props = {
    history: {
      push: jest.fn(),
    },
  };

  // our mock will resolve to { data: { token: '1234' }}
  mockedLogin.mockResolvedValueOnce({
    data: { token: '1234' },
  } as AxiosResponse<{ token: string }>);

  // spies on setItem
  const spySetItem = jest.spyOn(Storage.prototype, 'setItem');

  // we need a Router to make <Link /> works
  // we pass the props object to <Login /> using syntax ...props ("as any" to prevent TypeScript error),
  render(
    <MemoryRouter>
      <Login {...(props as any)} />
    </MemoryRouter>,
  );

  // select inputs using placeholders and type values
  userEvent.type(screen.getByPlaceholderText('Username'), 'valid-user');
  userEvent.type(screen.getByPlaceholderText('Password'), 'valid-password');

  // emit submit event on form
  fireEvent.submit(screen.getByRole('form'));

  // login should have been called with username and password
  expect(login).toHaveBeenCalledWith({
    username: 'valid-user',
    password: 'valid-password',
  });

  // since login is an async function we have to wait
  await waitFor(() => expect(spySetItem).toHaveBeenCalledWith('token', '1234'));
  expect(props.history.push).toHaveBeenCalledWith('/teacher');
});

test('Login with invalid credentials', async () => {
  // we create a fake props object with history.push as a mock function
  const props = {
    history: {
      push: jest.fn(),
    },
  };

  // our mock will rejects
  mockedLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

  // we need a Router to make <Link /> works
  // we pass the props object to <Login /> using syntax ...props ("as any" to prevent TypeScript error),
  render(
    <MemoryRouter>
      <Login {...(props as any)} />
    </MemoryRouter>,
  );

  // select inputs using placeholders and type values
  userEvent.type(screen.getByPlaceholderText('Username'), 'invalid-user');
  userEvent.type(screen.getByPlaceholderText('Password'), 'invalid-password');

  // emit submit event on form
  fireEvent.submit(screen.getByRole('form'));

  // login should have been called with username and password
  expect(login).toHaveBeenCalledWith({
    username: 'invalid-user',
    password: 'invalid-password',
  });

  // since login is an async function we have to wait
  await waitFor(() => {
    const errorElement = screen.getByText(/Invalid credentials/i);
    expect(errorElement).toBeInTheDocument();
  });
});
