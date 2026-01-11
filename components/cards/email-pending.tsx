import React from "react";
import { Card, CardContent } from "../ui/card";
import { ChangeEmail } from "./change-email";
import { useRelativeTime } from "@/hooks/use-relative-time";

function EmailPending({
  email,
  time,
  expiresAt,
}: {
  email: string;
  time?: string;
  expiresAt: string;
}) {
  const [relT] = useRelativeTime(time ?? new Date().toISOString());
  return (
    <div className="p-1 rounded-xl my-4 border border-yellow-500/20 bg-yellow-500/10 ">
      <Card className="rounded-lg border-0 ring-yellow-500/20 bg-yellow-500/10 pb-2">
        <CardContent className="text-sm tracking-wide text-pretty mb-0 pb-0 space-y-2">
          <div className="w-fit text-yellow-600 dark:text-yellow-500 uppercase text-xs font-mono tracking-wide">
            Pending
          </div>
          <div>
            Email has been sent to your inbox. <br />
            Verify your email to join the waitlist.
            <br />
          </div>
          <code className="bg-background/50 rounded-sm w-full block py-2 px-4 text-xs">
            {email}
          </code>
          <div className="text-muted-foreground uppercase text-[10px] font-mono flex items-center justify-between  ">
            <span>sent {time !== undefined && relT}</span>
            <span>expires {expiresAt}</span>
          </div>
          <ChangeEmail />
        </CardContent>
      </Card>
    </div>
  );
}

export default EmailPending;
