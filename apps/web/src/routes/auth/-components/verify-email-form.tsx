import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { buttonVariants } from "@starter/ui/components/button";
import { LumioLogo } from "@starter/ui/components/logos/lumio";
import { cn } from "@starter/ui/lib/utils";

type VerifyEmailFormProps = {
  className?: string;
  email?: string | null;
};

export function VerifyEmailForm({ className, email }: VerifyEmailFormProps) {
  return (
    <div className={cn("flex w-full flex-col items-center justify-center gap-2", className)}>
      <LumioLogo className="size-20" />
      <h3 className="text-xl">Email verified successfully!</h3>
      <div className="flex flex-col items-center justify-center">
        <p>Your email has been verified.</p>
        <Link className={cn(buttonVariants({ variant: "default" }), "mt-4")} to="/">
          <ArrowLeftIcon className="size-4" />
          Go to home
        </Link>
      </div>
      {email && <span className="font-semibold">{email}</span>}
    </div>
  );
}
