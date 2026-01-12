"use client";

import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, useStore } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import type { UserSelect } from "@/lib/db-helpers";
import EmailPending from "./cards/email-pending";
import EmailVerified from "./cards/email-verified";
import { ClockCountdownIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Loader from "./loader";
import { createUser } from "@/actions/user";
import { RainbowButton } from "./ui/rainbow-button";

const waitlistSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

function getUserStatus(user: UserSelect | null): "idle" | "pending" | "verified" {
  if (!user) return "idle";
  if (user.verifiedAt) return "verified";
  if (user.token && new Date(user.tokenExpiresAt).getTime() > Date.now()) return "pending";
  return "idle";
}

function WaitlistContent({ user }: { user: UserSelect | null }) {
  const status = getUserStatus(user);
  const form = useForm({
    defaultValues: {
      email: user?.email ?? "",
    },
    validators: {
      onSubmit: waitlistSchema,
    },
    onSubmit: async ({ value }) => {
      const loadingToast = toast.loading("Submitting...", {
        position: "top-center",
        duration: 3000,
        closeButton: true,
      });

      const result = await createUser({ email: value.email });
      if (result.error) {
        toast.error(result.error, { id: loadingToast });
      } else {
        toast.success("Check your email for verification!", { id: loadingToast });
        form.reset();
      }
    },
  });

  const _ = useStore(form.store);
  const disabled = form.state.isSubmitting || status !== "idle";

  return (
    <section className="max-w-sm my-8 mx-auto px-4 ms:px-0">
      <>
        <form
          id="waitlist-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="grid gap-3 grid-cols-[1fr_auto]">
                  <Field data-invalid={isInvalid}>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      required
                      disabled={disabled}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your email address"
                      autoComplete="off"
                      className="rounded-md font-mono placeholder:font-sans text-zinc-400 light:text-zinc-600"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                  <RainbowButton
                    type="submit"
                    form="waitlist-form"
                    disabled={disabled}
                    size={"sm"}
                    data-status={status}
                    className={
                      "rounded-md md:min-w-24 data-disabled:cursor-not-allowed dark:data-[status='verified']:bg-green-400 data-[status='verified']:bg-green-600 data-[status='pending']:bg-yellow-500 data-[status='pending']:text-yellow-950"
                    }
                  >
                    {status === "verified" ? (
                      <>
                        <CheckCircleIcon /> verified
                      </>
                    ) : status === "pending" ? (
                      <>
                        <ClockCountdownIcon /> pending
                      </>
                    ) : form.state.isSubmitting ? (
                      <>
                        <Loader />
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </RainbowButton>
                </div>
              );
            }}
          />
        </form>
        <div className="mt-4">
          {status === "pending" && user!.mailSentAt && (
            <EmailPending email={user!.email} time={user!.mailSentAt} />
          )}
          {status === "verified" && user!.verifiedAt && (
            <EmailVerified email={user!.email} verifiedAt={user!.verifiedAt} />
          )}
        </div>
      </>
    </section>
  );
}

export default function WaitlistComponent({ user }: { user: UserSelect | null }) {
  return <WaitlistContent user={user} />;
}
