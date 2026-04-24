import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site branding', () => {
  render(<App />);
  expect(screen.getByText('White Water Method')).toBeInTheDocument();
});
