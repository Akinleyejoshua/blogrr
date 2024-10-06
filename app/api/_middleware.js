import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Replace with your actual secret key (store securely in environment variables)
const SECRET_KEY = '012345678';

function middleware(req) {
  // Extract JWT token from authorization header (or alternative location)
  const token = req.headers.get('Authorization')?.split(' ')[1];

  // Check if token exists and API route requires authentication
  if (!token || !req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next(); // No token or non-protected route, continue
  }

  try {
    // Verify the JWT token using your secret key
    const decoded = jwt.verify(token, SECRET_KEY);

    // Handle successful verification
    return NextResponse.next(); // Allow access to protected route

  } catch (error) {
    // Handle invalid or expired token
    console.error('Invalid JWT:', error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/get-post'], // Protect all routes under /api/protected
};

export default middleware;