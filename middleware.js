import { NextResponse } from 'next/server';
import cors from 'cors';

// Create a CORS-enabled function
const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export async function middleware(request) {
  return await corsMiddleware(request, NextResponse);
}

export const config = {
  matcher: ['/api/signin'],
};
