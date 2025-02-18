import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const loggedInCookie = request.cookies.get('isLoggedIn');

    const isLoggedIn = loggedInCookie?.value === 'true'; 

    if (!isLoggedIn && request.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ['/((?!api|_next|favicon.ico).*)'],
};