import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("middleware is triggered!!");

    const token = request.cookies.get('auth_token')?.value;
    console.log("🚀 ~ middleware ~ token:", token)

    // Define the paths that should bypass authentication
    const bypassRoutes = ['/api'];

    // Check if the current request URL matches any bypass route
    if (bypassRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Redirect to login if token is not present
    if (!token) {
        console.log("redirecting...");

        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Allow access to protected routes
    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: '/:path*', // Match all paths
};
