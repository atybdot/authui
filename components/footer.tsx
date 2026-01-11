import Link from "next/link";
import { GlobeSimpleIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { MdiGithub } from "./icons/github";

function Footer() {
  return (
    <footer className="py-2 pb-3 px-4 md:px-12 md:pb-4 flex items-center justify-between gap-1 font-semibold text-xs tracking-wide text-muted-foreground/50">
      <div>
        created by
        <Link target="_blank" href={"https://atyb.me"} className="text-muted-foreground">
          {" "}
          atyb
        </Link>
      </div>
      <div className="space-x-4 flex items-center justify-center">
        <Link target="_blank" href={"https://atyb.me"} className="text-muted-foreground">
          <GlobeSimpleIcon />
        </Link>
        <Link target="_blank" href={"https://github.com/atybdot"} className="text-muted-foreground">
          {/* <GithubLogoIcon /> */}
          <MdiGithub />
        </Link>
        <Link target="_blank" href={"https://x.com/atybdot"} className="text-muted-foreground">
          <XLogoIcon />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
