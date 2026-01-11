import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

import { MdiGithub } from "./icons/github";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <div className=" absolute top-4 right-4 flex items-center justify-between gap-2 z-10!">
      <Link
        target="_blank"
        href={"https://github.com/atybdot/authui"}
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        <MdiGithub className="size-5" />
      </Link>
      <ModeToggle />
    </div>
  );
}

export default Navbar;
