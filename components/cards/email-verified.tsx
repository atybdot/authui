import { useRelativeTime } from "@/hooks/use-relative-time";
import { Card, CardContent } from "../ui/card";
import { ChangeEmail } from "./change-email";

function EmailVerified({ email, time }: { email: string; time?: string }) {
  const [relT] = useRelativeTime(time ?? new Date().toISOString());
  return (
    <div className="p-1 rounded-xl my-4 border border-teal-500/20 bg-green-500/10">
      <Card className="rounded-lg border-0 ring-green-500/20 bg-green-500/10 pb-2">
        <CardContent className="text-sm tracking-wide text-pretty mb-0 pb-0 space-y-2">
          <div className="w-fit dark:text-green-500 text-green-600 uppercase text-xs font-mono tracking-wide">
            <span>Verified</span>
          </div>
          <div>
            You are on the waitlist <br /> We will notify you on launch.
            <br />
          </div>
          <code className="bg-background/50 rounded-sm w-full block py-2 px-4 text-xs">
            {email}
          </code>
          <div className="flex items-center justify-between text-muted-foreground uppercase text-[10px] font-mono ">
            <span>verified {time !== undefined && relT}</span>
          </div>
          <ChangeEmail />
        </CardContent>
      </Card>
    </div>
  );
}

export default EmailVerified;
