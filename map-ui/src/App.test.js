import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top bar', () => {
  render(<App />);
  const topBar = screen.getByText(/Meta Agile Process Model/i);
  expect(topBar).toBeInTheDocument();
});
