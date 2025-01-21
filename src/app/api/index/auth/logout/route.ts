import { NextResponse } from 'next/server';

export async function GET() {
  // Create a response that removes the auth_token cookie
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // Set the auth_token cookie with a past expiration date to delete it
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: false, // Use `true` in production with HTTPS
    sameSite: 'strict',
    path: '/',
    maxAge: -1, // Negative value to expire the cookie immediately
  });

  return response;
}
