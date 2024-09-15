import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const session = getServerSession()

    if (!session) {
        return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/today/:path*'], 
};
