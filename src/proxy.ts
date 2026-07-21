import { type NextRequest, NextResponse } from "next/server";
import { getDashboardByRole, normalizeRole } from "@/lib/auth/role";

// ─── Route access map ────────────────────────────────────────────────────────
const ROLE_ROUTES: Record<string, string[]> = {
  super_admin: ["/super-admin"],
  admin: ["/admin"],
};

const PUBLIC_ROUTES = ["/auth/sign-in"];

const SESSION_KEY = "hsse_mock_session";

// ─── Proxy (Next.js 16+ middleware replacement) ───────────────────────────────
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static va api routelarga tegmaymiz
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Public routelarga ruxsat
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // Cookie dan session o'qish
  const sessionCookie = request.cookies.get(SESSION_KEY)?.value;

  let userRole: string | null = null;
  if (sessionCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(sessionCookie));
      userRole = normalizeRole(user?.role);
    } catch {
      userRole = null;
    }
  }

  // Login qilinmagan → sign-in ga yo'naltirish
  if (!userRole) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Root path → rolga qarab dashboard
  if (pathname === "/") {
    return NextResponse.redirect(new URL(getDashboardByRole(userRole), request.url));
  }

  // Role-based access control
  for (const [role, prefixes] of Object.entries(ROLE_ROUTES)) {
    if (prefixes.some((p) => pathname.startsWith(p))) {
      if (userRole !== role) {
        return NextResponse.redirect(new URL(getDashboardByRole(userRole), request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api).*)" ],
};
