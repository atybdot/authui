import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        "font-sans text-6xl md:text-8xl font-semibold flex items-center justify-center gap-1 text-foreground tracking-tighter",
        className,
      )}
    >
      auth<span className="text-zinc-700 light:text-zinc-300">UI</span>
    </h1>
  );
}

export default Logo;
