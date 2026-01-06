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

/**
 * Creates a Jest mock for next-auth's getServerSession that returns the given session.
 *
 * @param session - The Session object (or `null`) the mock should produce; defaults to `mockAdminSession`.
 * @returns A Jest mock function that returns the provided `session` when invoked.
 */
export function mockGetServerSession(session: Session | null = mockAdminSession) {
  return jest.fn().mockResolvedValue(session);
}

/**
 * Create a NextRequest with a mock authentication session attached.
 *
 * @param url - The request URL
 * @param options - Optional RequestInit overrides; provided headers are merged with the mock session header
 * @param session - The session object to embed in the `x-mock-session` header
 * @returns A NextRequest whose headers include `x-mock-session` containing the JSON-serialized `session`
 */
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

/**
 * Install a mock for next-auth's getServerSession that resolves to the given session and return the provided handler.
 *
 * @param handler - The request handler to return after setting up the mock
 * @param session - Session value that the mocked `getServerSession` will resolve to; defaults to `mockAdminSession`
 * @returns The same `handler` that was passed in
 */
export async function withAuth(handler: Function, session: Session | null = mockAdminSession) {
  jest.mock('next-auth', () => ({
    getServerSession: jest.fn().mockResolvedValue(session),
  }));
  
  return handler;
}