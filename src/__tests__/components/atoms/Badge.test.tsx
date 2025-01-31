import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '@/components/atoms/Badge';

describe('Badge Component', () => {
  it('renders with default props', () => {
    render(<Badge text="Test Badge" />);
    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary', 'text-white');
  });

  it('renders with secondary color', () => {
    render(<Badge text="Secondary Badge" color="secondary" />);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-secondary', 'text-black');
  });

  it('renders with accent color', () => {
    render(<Badge text="Accent Badge" color="accent" />);
    const badge = screen.getByText('Accent Badge');
    expect(badge).toHaveClass('bg-accent', 'text-black');
  });

  it('renders with glass color', () => {
    render(<Badge text="Glass Badge" color="glass" />);
    const badge = screen.getByText('Glass Badge');
    expect(badge).toHaveClass('bg-white/60', 'text-black', 'backdrop-blur-sm', 'rounded-lg');
  });

  it('applies custom className', () => {
    render(<Badge text="Custom Badge" className="custom-class" />);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('has correct base styles', () => {
    render(<Badge text="Style Test" />);
    const badge = screen.getByText('Style Test');
    expect(badge).toHaveClass('inline-block', 'px-3', 'py-1', 'font-medium', 'text-xs', 'rounded-full');
  });
});
