import { toast } from "sonner";

import { authClient } from "@starter/auth/react";
import { Button } from "@starter/ui/components/button";
import { cn } from "@starter/ui/lib/utils";

export function CancelSubscriptionButton({ className }: { className?: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("w-full", className)}
      onClick={async () => {
        await authClient.subscription.cancel({
          returnUrl: "/",
          fetchOptions: {
            onError: () => {
              toast.error("Error cancelling subscription", {
                description: "An unknown error occurred",
              });
            },
          },
        });
      }}
    >
      Cancel Subscription
    </Button>
  );
}
