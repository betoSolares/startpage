import NextAuth from 'next-auth';

const IGNORED_ROUTES = [`/((?!api|trpc))(_next.*|.+\\.[\\w]+$)`];

const API_ROUTES = ['/api/(.*)', '/trpc/(.*)'];

const AUTH_ROUTES = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/password/reset',
  '/auth/password/forgot',
  '/auth/confirmation',
];

const { auth } = NextAuth({ providers: [] });

export default auth((req) => {
  const isIgnoredRoute = createMatcher(IGNORED_ROUTES);
  const isAuthRoute = createMatcher(AUTH_ROUTES);
  const isApiRoute = createMatcher(API_ROUTES);
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;

  if (isIgnoredRoute(path)) {
    return;
  }

  if (isApiRoute(path)) {
    return;
  }

  if (isAuthRoute(path)) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/', req.nextUrl));
    }

    return;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/auth/sign-in', req.nextUrl));
  }
});

const createMatcher = (routes: Array<string>) => {
  const routePatterns = [routes || ''].flat().filter(Boolean);
  const matchers = precomputePathRegex(routePatterns);

  return (path: string) => matchers.some((matcher) => matcher.test(path));
};

const precomputePathRegex = (patterns: Array<string | RegExp>) => {
  return patterns.map((pattern) =>
    pattern instanceof RegExp ? pattern : new RegExp(pattern)
  );
};

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
