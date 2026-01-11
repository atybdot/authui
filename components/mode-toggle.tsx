"use client";
import { useTheme } from "next-themes";
import { CircleHalfTiltIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      size={"icon-lg"}
      variant={"ghost"}
      onClick={() => (resolvedTheme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <CircleHalfTiltIcon className="-rotate-45 size-5" />
    </Button>
  );
}
