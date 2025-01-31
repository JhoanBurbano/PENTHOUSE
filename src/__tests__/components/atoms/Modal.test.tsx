import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Modal from '@/components/atoms/Modal';

// Mock the hugeicons-react component
jest.mock('hugeicons-react', () => ({
  Cancel01Icon: () => <div data-testid="mock-cancel-icon">X</div>,
}));

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
    // Reset body style
    document.body.style.overflow = 'unset';
  });

  describe('Rendering', () => {
    it('renders when open is true', () => {
      render(<Modal {...defaultProps} />);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when open is false', () => {
      render(<Modal {...defaultProps} open={false} />);
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders with title when provided', () => {
      const title = 'Test Modal';
      render(<Modal {...defaultProps} title={title} />);
      
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('renders without title section when not provided', () => {
      render(<Modal {...defaultProps} />);
      
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby');
    });
  });

  describe('Interaction', () => {
    it('calls onClose when close button is clicked', async () => {
      jest.useFakeTimers();
      render(<Modal {...defaultProps} />);
      
      const closeButton = screen.getByRole('button', { name: /close modal/i });
      fireEvent.click(closeButton);
      
      // Wait for animation timeout
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });

    it('calls onClose when Escape key is pressed', async () => {
      jest.useFakeTimers();
      render(<Modal {...defaultProps} />);
      
      fireEvent.keyDown(document, { key: 'Escape' });
      
      // Wait for animation timeout
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });

    it('calls onClose when clicking outside the modal', async () => {
      jest.useFakeTimers();
      render(<Modal {...defaultProps} />);
      
      const overlay = screen.getByRole('presentation');
      fireEvent.mouseDown(overlay);
      
      // Wait for animation timeout
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });

    it('does not call onClose when clicking inside the modal', () => {
      render(<Modal {...defaultProps} />);
      
      const modalContent = screen.getByText('Modal Content');
      fireEvent.mouseDown(modalContent);
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('applies correct max-width class based on maxWidth prop', () => {
      const sizes = ['sm', 'md', 'lg', 'xl'] as const;
      
      sizes.forEach(size => {
        const { unmount } = render(<Modal {...defaultProps} maxWidth={size} />);
        expect(screen.getByRole('dialog')).toHaveClass(`max-w-${size}`);
        unmount();
      });
    });

    it('applies custom className when provided', () => {
      const customClass = 'custom-modal';
      render(<Modal {...defaultProps} className={customClass} />);
      
      expect(screen.getByRole('dialog')).toHaveClass(customClass);
    });

    it('applies closing animation classes when closing', async () => {
      jest.useFakeTimers();
      render(<Modal {...defaultProps} />);
      
      const closeButton = screen.getByRole('button', { name: /close modal/i });
      fireEvent.click(closeButton);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('animate-slideUpOut', 'md:animate-slideLeftOut');
      
      // Wait for animation timeout
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      jest.useRealTimers();
    });
  });

  describe('Body Overflow', () => {
    it('sets body overflow to hidden when modal opens', () => {
      render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('resets body overflow when modal closes', () => {
      const { rerender } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
      
      rerender(<Modal {...defaultProps} open={false} />);
      expect(document.body.style.overflow).toBe('unset');
    });

    it('resets body overflow on unmount', () => {
      const { unmount } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
      
      unmount();
      expect(document.body.style.overflow).toBe('unset');
    });
  });
});
