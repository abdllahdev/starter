import { toast } from "sonner";

import { authClient } from "@starter/auth/react";
import { Button } from "@starter/ui/components/button";
import { cn } from "@starter/ui/lib/utils";

export function UpgradeButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Button
      variant="default"
      size="sm"
      className={cn("h-7 text-xs", className)}
      onClick={async () =>
        await authClient.subscription.upgrade({
          plan: "pro",
          successUrl: import.meta.env.VITE_WEB_URL,
          cancelUrl: import.meta.env.VITE_WEB_URL + "/billing",
          fetchOptions: {
            onError: (_: unknown) => {
              toast.error("Error upgrading subscription", {
                description: "An unknown error occurred",
              });
            },
          },
        })
      }
    >
      {children}
    </Button>
  );
}
