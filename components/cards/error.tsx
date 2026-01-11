import React from "react";
import Logo from "../Logo";
import { XCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
function ErrorCard({ description, msg }: { description: string; msg: string; code: number }) {
  return (
    <section className="p-4 md:py-32 py-16 space-y-12 **:cursor-default font-mono">
      <Logo />
      <div className="space-y-4">
        <h3 className="lowercase text-xl md:text-3xl flex flex-col items-center justify-center gap-y-2 text-center text-rose-600">
          <XCircleIcon className="size-8" />
          <span>{msg}</span>
        </h3>
        <div className="p-4  bg-zinc-100 border dark:bg-zinc-900 max-w-3xs md:max-w-xs mx-auto rounded-lg text-center flex flex-col items-center opacity-100 aspect-video">
          <div className="flex-1 content-center block text-xl">{description}</div>
        </div>
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-sm mx-auto block text-muted-foreground/50 hover:text-muted-foreground transition-all duration-200 ease-in-out font-light w-fit mt-8 md:mt-12",
          )}
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}

export default ErrorCard;
