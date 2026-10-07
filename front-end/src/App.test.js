import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Keep the network and the ESM-only axios build out of the unit tests.
jest.mock('./api/axiosInstance', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() },
  errorMessage: (e, f) => f,
}));

beforeEach(() => localStorage.clear());

test('signed-out visitors are sent from a protected page to the login form', async () => {
  window.history.pushState({}, '', '/dashboard');
  render(<App />);
  await waitFor(() => expect(screen.getByText(/welcome back/i)).toBeInTheDocument());
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test('sign-up form checks that passwords match before calling the API', async () => {
  window.history.pushState({}, '', '/signup');
  render(<App />);
  const { default: userEvent } = await import('@testing-library/user-event');
  await waitFor(() => screen.getByText(/create your account/i));
  userEvent.type(screen.getByLabelText(/full name/i), 'Yolanda');
  userEvent.type(screen.getByLabelText(/^email/i), 'y@example.com');
  userEvent.type(screen.getByLabelText(/^password/i), 'longenough1');
  userEvent.type(screen.getByLabelText(/confirm password/i), 'different123');
  userEvent.click(screen.getByRole('button', { name: /sign up/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent(/do not match/i);
});
