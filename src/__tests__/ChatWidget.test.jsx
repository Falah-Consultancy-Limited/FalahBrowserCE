import { render, screen } from '@testing-library/react';
import ChatWidget from '../components/ChatWidget';

describe('ChatWidget', () => {
  const mockGroup = {
    id: 1,
    name: 'Islamic Finance',
    platform: 'telegram',
    url: 'https://t.me/IslamicFinanceGroup',
    unread: 45,
    lastMessage: 'Should we invest in halal bonds?',
    members: 3200
  };

  test('renders without crashing', () => {
    render(<ChatWidget group={mockGroup} />);
    expect(screen.getByText(/Islamic Finance/i)).toBeInTheDocument();
  });

  test('displays platform badge', () => {
    render(<ChatWidget group={mockGroup} />);
    expect(screen.getByText('Telegram')).toBeInTheDocument();
  });

  test('displays unread count', () => {
    render(<ChatWidget group={mockGroup} />);
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  test('displays last message', () => {
    render(<ChatWidget group={mockGroup} />);
    expect(screen.getByText(/halal bonds/i)).toBeInTheDocument();
  });

  test('displays member count', () => {
    render(<ChatWidget group={mockGroup} />);
    expect(screen.getByText(/3,200 members/i)).toBeInTheDocument();
  });

  test('calls onOpen when open button clicked', () => {
    const onOpen = jest.fn();
    render(<ChatWidget group={mockGroup} onOpen={onOpen} />);
    const openButton = screen.getByRole('button', { name: /Open in Telegram/i });
    openButton.click();
    expect(onOpen).toHaveBeenCalledWith('telegram', mockGroup.url);
  });
});