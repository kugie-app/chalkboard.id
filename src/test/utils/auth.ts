import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';

// Mock user sessions
export const mockAdminSession: Session = {
  user: {
    id: 'admin-123',
    email: 'admin@test.com',
    name: 'Test Admin',
    role: 'OWNER',
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export const mockStaffSession: Session = {
  user: {
    id: 'staff-456',
    email: 'staff@test.com',
    name: 'Test Staff',
    role: 'STAFF',
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export const mockCashierSession: Session = {
  user: {
    id: 'cashier-789',
    email: 'cashier@test.com',
    name: 'Test Cashier',
    role: 'CASHIER',
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

// Mock getServerSession
export function mockGetServerSession(session: Session | null = mockAdminSession) {
  return jest.fn().mockResolvedValue(session);
}

// Create authenticated request
export function createAuthenticatedRequest(
  url: string,
  options: RequestInit = {},
  session: Session = mockAdminSession
): NextRequest {
  const request = new NextRequest(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-mock-session': JSON.stringify(session),
    },
  });
  
  return request;
}

// Mock auth middleware
export async function withAuth(handler: Function, session: Session | null = mockAdminSession) {
  jest.mock('next-auth', () => ({
    getServerSession: jest.fn().mockResolvedValue(session),
  }));
  
  return handler;
}