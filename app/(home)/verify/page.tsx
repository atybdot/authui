"use client";
import { verifyEmail, VerifyEmailResult } from "@/actions/email";
import ErrorCard from "@/components/cards/error";
import Loader from "@/components/loader";
import Logo from "@/components/Logo";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { CheckCircleIcon } from "@phosphor-icons/react";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyContent({ data }: { data: { token: string; email: string } }) {
  const { token, email } = data;
  const [result, setResult] = useState<null | Awaited<VerifyEmailResult>>(null);

  useEffect(() => {
    verifyEmail(email, token).then((r) => setResult(r));
  }, [email, token]);

  useEffect(() => {
    if (result?.data) {
      const tId = setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return () => clearTimeout(tId);
    }
  }, [result]);

  if (result === null) {
    return <LoadingFallback />;
  }

  if (result.error) {
    return <ErrorCard description={result.error} msg="unable to verify" code={result.status} />;
  }

  return (
    <section className="p-4 md:py-32 py-16 space-y-12 md:space-y-24 **:cursor-default font-mono">
      <Logo />
      <div className="space-y-4">
        <h3 className="lowercase text-xl md:text-3xl flex flex-col items-center justify-center gap-y-2 text-center text-green-600">
          <CheckCircleIcon className="size-8" />
          <span>email verified</span>
        </h3>
        <TextShimmer className="text-center mx-auto w-fit block" duration={0.8} spread={4}>
          redirecting
        </TextShimmer>
      </div>
    </section>
  );
}

function VerifyParams() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  if (!email || !token) {
    return (
      <ErrorCard
        description={`[${!email && "email"}${!email && !token && ", "}${!token && "token"}]`}
        msg="invalid parameters"
        code={400}
      />
    );
  }

  return <VerifyContent data={{ token, email }} />;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyParams />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <section className="p-4 md:py-32 py-16 space-y-12 md:space-y-24 **:cursor-default font-mono">
      <Logo />
      <div>
        <h3 className="lowercase text-xl md:text-3xl flex flex-col items-center justify-center gap-y-2 text-muted-foreground text-center">
          <Loader iconClassName="size-8" />
          <TextShimmer duration={0.8} spread={4}>
            verifying email
          </TextShimmer>
        </h3>
      </div>
    </section>
  );
}
