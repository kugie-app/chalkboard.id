// Jest setup file
require('@testing-library/jest-dom');

// Mock environment variables for testing
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/chalkboard_test';
process.env.NEXTAUTH_SECRET = 'test-secret-key';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.DEPLOYMENT_MODE = 'test';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations() {
    return (key) => key;
  },
  useLocale() {
    return 'en';
  },
}));

// Suppress console errors during tests unless specifically testing error scenarios
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Global test timeout
jest.setTimeout(30000);