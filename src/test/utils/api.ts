import { NextRequest } from 'next/server';
import { Session } from 'next-auth';
import { mockAdminSession } from './auth';

/**
 * Constructs a NextRequest configured with the specified HTTP method, URL, optional JSON body, and headers.
 *
 * @param body - Optional request payload; when provided and the method is not `GET`, it is JSON-stringified and set as the request body.
 * @param headers - Additional headers to merge with the default `Content-Type: application/json`.
 * @returns The created NextRequest with the provided method, URL, body (if any), and merged headers.
 */
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

/**
 * Invoke a Next.js API route handler with a mocked next-auth session and return the handler's response parsed for tests.
 *
 * Creates a NextRequest using the provided method, URL, and optional body, replaces next-auth's server session with the given `session`, calls the handler, and attempts to parse the response body as JSON.
 *
 * @param handler - The API route handler to invoke (receives a NextRequest).
 * @param method - HTTP method to use for the request (e.g., `'GET'`, `'POST'`).
 * @param url - The request URL.
 * @param body - Optional request body to include (serialized for non-GET methods).
 * @param session - Mocked next-auth Session to return from getServerSession, or `null`; defaults to `mockAdminSession`.
 * @returns An object containing `status` (response status code), `data` (parsed JSON response body or `null`), and `headers` (response headers).
 */
export async function apiRequest(
  handler: Function,
  method: string,
  url: string,
  body?: any,
  session: Session | null = mockAdminSession
) {
  // Mock the session
  jest.mock('next-auth', () => ({
    getServerSession: jest.fn().mockResolvedValue(session),
  }));

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
  get: (handler: Function, url: string, session?: Session) =>
    apiRequest(handler, 'GET', url, undefined, session),
    
  post: (handler: Function, url: string, body: any, session?: Session) =>
    apiRequest(handler, 'POST', url, body, session),
    
  put: (handler: Function, url: string, body: any, session?: Session) =>
    apiRequest(handler, 'PUT', url, body, session),
    
  delete: (handler: Function, url: string, session?: Session) =>
    apiRequest(handler, 'DELETE', url, undefined, session),
};

/**
 * Assert that an API response represents the expected error.
 *
 * Checks that the response status equals the expected `status`; if `message` is provided,
 * also checks that `response.data?.error` equals `message`.
 *
 * @param response - The API response object containing `status` and optional `data`
 * @param status - The expected HTTP status code
 * @param message - Optional expected error message to compare against `response.data?.error`
 */
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

/**
 * Assert that an API response indicates success and return its data.
 *
 * @param response - The API response object containing `status` and `data`.
 * @param status - Expected HTTP status code (defaults to 200).
 * @returns The `data` payload from the response
 */
export function expectApiSuccess(
  response: { status: number; data: any },
  status: number = 200
) {
  expect(response.status).toBe(status);
  expect(response.data).toBeDefined();
  return response.data;
}