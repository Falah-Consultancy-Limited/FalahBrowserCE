import { render, screen, waitFor } from '@testing-library/react';
import LanternCentral from '../components/LanternCentral';

describe('LanternCentral', () => {
  test('renders without crashing', () => {
    render(<LanternCentral />);
    expect(screen.getByText('Falah Browser')).toBeInTheDocument();
  });

  test('displays prayer time', () => {
    render(<LanternCentral />);
    expect(screen.getByText(/Next Prayer/i)).toBeInTheDocument();
  });

  test('displays daily verse', () => {
    render(<LanternCentral />);
    expect(screen.getByText(/Today's Verse/i)).toBeInTheDocument();
  });

  test('displays dua streak', () => {
    render(<LanternCentral />);
    expect(screen.getByText(/Dua Streak/i)).toBeInTheDocument();
  });

  test('switches tabs on click', async () => {
    render(<LanternCentral />);
    const discoverTab = screen.getByText(/Discover/i);
    discoverTab.click();
    await waitFor(() => {
      expect(screen.getByText(/Discover Communities/i)).toBeInTheDocument();
    });
  });

  test('displays group cards in inbox', () => {
    render(<LanternCentral />);
    expect(screen.getByText(/Islamic Finance/i)).toBeInTheDocument();
  });
});