import { NextRequest } from 'next/server';
import { Session } from 'next-auth';
import { mockAdminSession } from './auth';

// API test helpers
export function createRequest(
  method: string,
  url: string,
  body?: any,
  headers: Record<string, string> = {}
): NextRequest {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  return new NextRequest(url, options);
}

export async function apiRequest(
  handler: Function,
  method: string,
  url: string,
  body?: any
) {
  // Note: Authentication should be mocked at module level, not here
  // Use jest.mock('@/lib/auth') in test files and auth.mockResolvedValue(session)

  const request = createRequest(method, url, body);
  const response = await handler(request);
  
  let data;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = null;
  }

  return {
    status: response.status,
    data,
    headers: response.headers,
  };
}

// Helper to test API routes with different methods
export const testApi = {
  get: (handler: Function, url: string, _session?: Session) =>
    apiRequest(handler, 'GET', url, undefined),
    
  post: (handler: Function, url: string, body: any, _session?: Session) =>
    apiRequest(handler, 'POST', url, body),
    
  put: (handler: Function, url: string, body: any, _session?: Session) =>
    apiRequest(handler, 'PUT', url, body),
    
  delete: (handler: Function, url: string, _session?: Session) =>
    apiRequest(handler, 'DELETE', url, undefined),
};

// Helper to test error responses
export function expectApiError(
  response: { status: number; data: any },
  status: number,
  message?: string
) {
  expect(response.status).toBe(status);
  if (message) {
    expect(response.data?.error).toBe(message);
  }
}

// Helper to test successful responses
export function expectApiSuccess(
  response: { status: number; data: any },
  status: number = 200
) {
  expect(response.status).toBe(status);
  expect(response.data).toBeDefined();
  return response.data;
}