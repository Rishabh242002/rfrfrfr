import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

// Define your locales and default locale
const locales = ["en", "fr","ar"];
const defaultLocale = "en";

// Create the NextIntl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

const protectedRoute = createRouteMatcher([
"/:locale(fr|ar|en)/eco",
  "/:locale(fr|ar|en)/eco/upcoming",
  "/:locale(fr|ar|en)/eco/meeting(.*)",
  "/:locale(fr|ar|en)/eco/previous",
  "/:locale(fr|ar|en)/eco/recordings",
  "/:locale(fr|ar|en)/eco/personal-room",
  "/:locale(fr|ar|en)/eco/todolist",
  "/:locale(fr|ar|en)/eco/supportcoursuser",
  "/:locale(fr|ar|en)/eco/exercicesuser",

  "/:locale(fr|ar|en)/sm",
  "/:locale(fr|ar|en)/sm/upcoming",
  "/:locale(fr|ar|en)/sm/meeting(.*)",
  "/:locale(fr|ar|en)/sm/previous",
  "/:locale(fr|ar|en)/sm/recordings",
  "/:locale(fr|ar|en)/sm/personal-room",
  "/:locale(fr|ar|en)/eco/todolist",
  "/:locale(fr|ar|en)/eco/supportcoursuser",
  "/:locale(fr|ar|en)/eco/exercicesuser",

  "/:locale(fr|ar|en)/pc-svt",
  "/:locale(fr|ar|en)/pc-svt/upcoming",
  "/:locale(fr|ar|en)/pc-svt/meeting(.*)",
  "/:locale(fr|ar|en)/pc-svt/previous",
  "/:locale(fr|ar|en)/pc-svt/recordings",
  "/:locale(fr|ar|en)/pc-svt/personal-room",
  "/:locale(fr|ar|en)/eco/todolist",
  "/:locale(fr|ar|en)/eco/supportcoursuser",
  "/:locale(fr|ar|en)/eco/exercicesuser",
]);

// Export the combined middleware
// export default async function middleware(req) {
//   // Handle Clerk authentication
//   const auth = await clerkMiddleware((auth, req) => {
//     if (protectedRoute(req)) auth().protect();
//   })(req);

//   // If the request was already handled by Clerk, return the response
//   if (auth) {
//     return auth;
//   }

//   // Handle locale detection with NextIntl
//   const intlResponse = intlMiddleware(req);

//   // Return the response from NextIntl or proceed to next middleware
//   return intlResponse || NextResponse.next();
// }

export default clerkMiddleware((auth, req) => {
  if (protectedRoute(req)) auth().protect();

  return intlMiddleware(req);
});

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/",
    "/(ar|fr|en)/:path*",
  ],
};

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/", "/(de|en)/:path*"],
// };
