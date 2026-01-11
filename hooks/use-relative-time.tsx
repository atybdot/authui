import React from "react";

export function useRelativeTime(initialDate: Date | string) {
  const [date, setDate] = React.useState<Date | string>(initialDate);

  const [timeMsg, setTimeMsg] = React.useState("");

  React.useEffect(() => {
    const update = () => {
      const now = new Date();
      const past = new Date(date);
      const diffMs = past.getTime() - now.getTime();
      const diffSecs = Math.round(diffMs / 1000);
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

      if (Math.abs(diffSecs) < 60) {
        setTimeMsg(rtf.format(diffSecs, "seconds"));
      } else if (Math.abs(diffSecs) < 3600) {
        setTimeMsg(rtf.format(Math.ceil(diffSecs / 60), "minutes"));
      } else if (Math.abs(diffSecs) < 86400) {
        setTimeMsg(rtf.format(Math.ceil(diffSecs / 3600), "hours"));
      } else {
        setTimeMsg(rtf.format(Math.ceil(diffSecs / 86400), "days"));
      }
    };

    update();
    const interval = setInterval(update, 60 * 1000);
    return () => clearInterval(interval);
  }, [date]);

  return [timeMsg, setDate] as const;
}
