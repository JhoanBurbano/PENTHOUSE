import { renderHook } from '@testing-library/react';
import useIntersectionObserver from '@/hooks/useIntersectionObservers';

describe('useIntersectionObserver Hook', () => {
  const mockIntersectionObserver = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockClear();
    mockDisconnect.mockClear();

    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      disconnect: mockDisconnect,
      unobserve: jest.fn(),
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.elementRef.current).toBe(null);
  });

  it('should create IntersectionObserver with correct threshold', () => {
    const threshold = 0.5;
    renderHook(() => useIntersectionObserver(threshold));
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold })
    );
  });

  it('should update isIntersecting when intersection changes', () => {
    let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: mockDisconnect,
        unobserve: jest.fn(),
      };
    });

    const { result } = renderHook(() => useIntersectionObserver());

    const mockEntry = {
      isIntersecting: true,
    } as IntersectionObserverEntry;

    intersectionCallback([mockEntry]);

    expect(result.current.isIntersecting).toBe(true);
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useIntersectionObserver());
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should handle multiple threshold values', () => {
    const thresholds = [0, 0.5, 1];
    renderHook(() => useIntersectionObserver(thresholds));
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold: thresholds })
    );
  });
});
