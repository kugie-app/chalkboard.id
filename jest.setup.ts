// Jest setup file
import '@testing-library/jest-dom'

// Mock environment variables for testing
// In CI, use the service container database, locally use port 5433 for test database
process.env.DATABASE_URL = process.env.DATABASE_URL || 
  (process.env.CI ? 'postgresql://postgres:postgres@localhost:5432/chalkboard_test' : 
   'postgresql://postgres:postgres@localhost:5433/chalkboard_test')
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'test-secret-key'
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'
process.env.DEPLOYMENT_MODE = process.env.DEPLOYMENT_MODE || 'test'

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
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations() {
    return (key: string) => key
  },
  useLocale() {
    return 'en'
  },
}))

// Note: If specific tests need to suppress console.error, use per-test spies:
// jest.spyOn(console, 'error').mockImplementation()
// and restore with mockRestore() after each test

// Global test timeout
jest.setTimeout(30000)