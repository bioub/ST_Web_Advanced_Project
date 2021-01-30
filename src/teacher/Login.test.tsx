import { render, screen } from '@testing-library/react';
import { RouteComponentProps } from 'react-router-dom';

import Login from './Login';

test('renders Login', () => {
  const props = {};
  render(<Login {...(props as RouteComponentProps)} />);

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
