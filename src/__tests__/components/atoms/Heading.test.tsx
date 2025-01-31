import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '@/components/atoms/Heading';

describe('Heading Component', () => {
  it('renders with default props (h1)', () => {
    render(<Heading text="Test Heading" />);
    const heading = screen.getByText('Test Heading');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass('text-gray-900', 'font-bold');
  });

  it('renders with different heading levels', () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;
    
    levels.forEach(level => {
      render(<Heading text={`H${level} Heading`} level={level} />);
      const heading = screen.getByText(`H${level} Heading`);
      expect(heading.tagName).toBe(`H${level}`);
    });
  });

  it('applies custom className', () => {
    render(<Heading text="Custom Heading" className="custom-class" />);
    const heading = screen.getByText('Custom Heading');
    expect(heading).toHaveClass('custom-class');
  });

  it('maintains default classes when custom class is added', () => {
    render(<Heading text="Test Heading" className="custom-class" />);
    const heading = screen.getByText('Test Heading');
    expect(heading).toHaveClass('text-gray-900', 'font-bold', 'custom-class');
  });
});
