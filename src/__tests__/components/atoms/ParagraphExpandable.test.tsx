import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ParagraphExpandable from '@/components/atoms/ParagraphExpandable';

describe('ParagraphExpandable Component', () => {
  const shortText = 'This is a short text';
  const longText = 'This is a very long text that should be truncated because it exceeds the maximum length allowed for the paragraph. It contains more than 150 characters to ensure the truncation functionality works correctly.';
  
  describe('Rendering', () => {
    it('renders short text without expand button', () => {
      render(<ParagraphExpandable text={shortText} />);
      
      expect(screen.getByText(shortText)).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders truncated text with expand button for long text', () => {
      render(<ParagraphExpandable text={longText} />);
      
      const truncatedText = `${longText.slice(0, 150)}...`;
      expect(screen.getByText(new RegExp(truncatedText))).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument();
    });

    it('renders with custom maxLength', () => {
      const maxLength = 50;
      render(<ParagraphExpandable text={longText} maxLength={maxLength} />);
      
      const truncatedText = `${longText.slice(0, maxLength)}...`;
      expect(screen.getByText(new RegExp(truncatedText))).toBeInTheDocument();
    });

    it('renders with custom expand/collapse text', () => {
      const expandText = 'Show more';
      const collapseText = 'Show less';
      
      render(
        <ParagraphExpandable 
          text={longText} 
          expandText={expandText} 
          collapseText={collapseText}
        />
      );
      
      expect(screen.getByRole('button', { name: expandText })).toBeInTheDocument();
      
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('button', { name: collapseText })).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('expands text when clicking expand button', () => {
      render(<ParagraphExpandable text={longText} />);
      
      const expandButton = screen.getByRole('button', { name: /read more/i });
      fireEvent.click(expandButton);
      
      expect(screen.getByText(longText)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /read less/i })).toBeInTheDocument();
    });

    it('collapses text when clicking collapse button', () => {
      render(<ParagraphExpandable text={longText} />);
      
      // First expand
      fireEvent.click(screen.getByRole('button', { name: /read more/i }));
      // Then collapse
      fireEvent.click(screen.getByRole('button', { name: /read less/i }));
      
      const truncatedText = `${longText.slice(0, 150)}...`;
      expect(screen.getByText(new RegExp(truncatedText))).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument();
    });

    it('toggles aria-expanded attribute correctly', () => {
      render(<ParagraphExpandable text={longText} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const customClass = 'custom-paragraph';
      render(<ParagraphExpandable text={longText} className={customClass} />);
      
      const container = screen.getByText(new RegExp(longText.slice(0, 150))).closest('div');
      expect(container).toHaveClass(customClass);
    });

    it('applies correct button styles', () => {
      render(<ParagraphExpandable text={longText} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'text-primary',
        'hover:text-primary/80',
        'font-medium',
        'inline-block',
        'transition-colors',
        'underline'
      );
    });

    it('applies transition styles to paragraph', () => {
      render(<ParagraphExpandable text={longText} />);
      
      const paragraph = screen.getByText(new RegExp(longText.slice(0, 150))).closest('p');
      expect(paragraph).toHaveClass('transition-all', 'duration-300');
    });
  });
});
