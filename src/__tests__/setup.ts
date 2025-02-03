import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Mock Next.js components and hooks
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage() {
    return 'Mock Image';
  },
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      pathname: '',
    };
  },
  usePathname() {
    return '';
  },
}));

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
});
