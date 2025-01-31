import React from 'react';
import { render, screen } from '@testing-library/react';
import CardImage from '@/components/atoms/CardImage';

describe('CardImage Component', () => {
  const defaultProps = {
    title: 'John Doe',
    subtitle: 'joans.burbano@gmail.com',
    image: 'https://i.pravatar.cc/300'
  };

  it('renders with default props', () => {
    render(<CardImage {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('joans.burbano@gmail.com')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const customProps = {
      title: 'Jane Smith',
      subtitle: 'jane@example.com',
      image: 'https://example.com/image.jpg'
    };

    render(<CardImage {...customProps} />);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('renders with correct layout classes', () => {
    render(<CardImage {...defaultProps} />);
    
    const container = screen.getByText('John Doe').closest('div');
    expect(container).toHaveClass('flex gap-2 items-center');
    
    const figure = screen.getByText('Mock Image').closest('figure');
    expect(figure).toHaveClass('w-[50px] h-[50px] object-cover bg-gray-300 flex items-center justify-center overflow-hidden rounded-full');
    
    const textContainer = screen.getByText('John Doe').parentElement;
    expect(textContainer).toHaveClass('flex flex-col flex-1');
  });
});
