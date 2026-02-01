import type { Session, Subscription } from "@starter/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@starter/ui/components/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@starter/ui/components/tabs";

import { SubscriptionPlans } from "@/components/billing/subscription-plans";
import { ChangePasswordForm } from "./change-password-form";
import { SessionsList } from "./sessions-list";
import { UpdateEmailForm } from "./update-email-form";
import { UpdateNameForm } from "./update-name-form";

export function AccountSettingsDialog({
  open,
  onOpenChange,
  session,
  activeSubscription,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
  activeSubscription: Subscription | null;
}) {
  if (!session) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex size-full max-h-150 min-w-4xl flex-col">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" className="flex w-full flex-row">
          <TabsList className="flex h-fit w-48 flex-col p-2">
            <TabsTrigger value="account" className="w-full justify-start">
              Account
            </TabsTrigger>
            <TabsTrigger value="billing" className="w-full justify-start">
              Billing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="scrollbar-thin flex max-h-128 flex-col gap-4 overflow-y-auto scrollbar-thumb-muted-foreground scrollbar-track-background">
              <UpdateNameForm />
              <UpdateEmailForm />
              <ChangePasswordForm />
              <SessionsList session={session} />
            </div>
          </TabsContent>
          <TabsContent value="billing">
            <SubscriptionPlans activeSubscription={activeSubscription} session={session} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
