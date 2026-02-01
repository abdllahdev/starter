import { createFileRoute, Link } from "@tanstack/react-router";

import { buttonVariants } from "@starter/ui/components/button";

import { getSessionFn } from "@/lib/auth/get-session-fn";

export const Route = createFileRoute("/(marketing)/")({
  beforeLoad: async () => {
    const session = await getSessionFn();
    return { session };
  },
  loader: async ({ context }) => {
    return {
      session: context.session,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useLoaderData();

  return (
    <div className="flex min-h-screen items-center justify-center">
      {session ? (
        <Link to="/dashboard" className={buttonVariants({ variant: "default" })}>
          Dashboard
        </Link>
      ) : (
        <>
          <Link to="/auth/sign-in" className={buttonVariants({ variant: "default" })}>
            Sign In
          </Link>
          <Link to="/auth/sign-up" className={buttonVariants({ variant: "outline" })}>
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}
