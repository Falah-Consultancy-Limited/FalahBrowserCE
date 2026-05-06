import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('renders LanternCentral component', () => {
    render(<App />);
    expect(screen.getByText(/Next Prayer/i)).toBeInTheDocument();
  });
});