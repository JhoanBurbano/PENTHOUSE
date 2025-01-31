import React from 'react';
import { render, screen } from '@testing-library/react';
import IconLabel from '@/components/atoms/IconLabel';

describe('IconLabel Component', () => {
  const mockIcon = <span data-testid="mock-icon">🏠</span>;

  it('renders with required props', () => {
    render(<IconLabel icon={mockIcon} label="Test Label" />);
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with optional message', () => {
    render(
      <IconLabel
        icon={mockIcon}
        label="Test Label"
        message="Additional Message"
      />
    );
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Additional Message')).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    render(<IconLabel icon={mockIcon} label="Test Label" />);
    
    const container = screen.getByText('Test Label').closest('div');
    expect(container).toHaveClass('flex', 'items-center', 'gap-2');
    
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('text-sm', 'font-black', 'text-gray-700');
  });

  it('applies correct styles to message when present', () => {
    render(
      <IconLabel
        icon={mockIcon}
        label="Test Label"
        message="Additional Message"
      />
    );
    
    const message = screen.getByText('Additional Message');
    expect(message).toHaveClass('text-xs', 'font-normal', 'text-gray-500');
  });
});
