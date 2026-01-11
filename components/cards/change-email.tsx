"use client";
import { Button } from "../ui/button";
import { clearUserEmail } from "@/actions/cookies";
export function ChangeEmail() {
  return (
    <Button
      onClick={async () => {
        clearUserEmail();
      }}
      variant={"link"}
      className={
        "font-mono text-xs text-foreground/50 text-center border w-fit mx-auto block transition-all duration-200 ease-in-out hover:text-foreground font-light"
      }
    >
      change email
    </Button>
  );
}
