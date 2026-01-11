import { formatTokenExpiry } from "@/lib/utils";
import {
  Body,
  Button,
  Head,
  Heading,
  Html,
  Link,
  pixelBasedPreset,
  Section,
  Tailwind,
  Img,
  Text,
} from "@react-email/components";
const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

export const VerifyEmail = ({ href, expiresAt }: { href: string; expiresAt: number | Date }) => {
  return (
    <Html>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Head />
        <Body className="mx-auto my-auto dark:bg-black bg-white font-sans py-12 max-w-xs h-full px-6 **:cursor-default">
          <Section className="flex flex-col items-start justify-start mb-6 text-2xl font-semibold text-foreground tracking-tight text-start">
            auth<span className="text-zinc-400 dark:text-zinc-600 ">UI</span>
          </Section>
          <Heading className="text-start font-sans font-medium">Confirm Your Email</Heading>
          <Text>
            Thank you for Showing interest in{" "}
            <span className="font-semibold text-md">
              auth
              <span className="text-zinc-400 dark:text-zinc-600">UI</span>
            </span>
            .
            <br />
            Please confirm your email address by clicking the button below.
          </Text>
          <Button
            href={href}
            className="bg-zinc-950 text-zinc-50 lowercase text-sm px-4 py-2 rounded-md"
          >
            confirm email
          </Button>
          <Text className="text-zinc-500 mt-12">
            If the above button does not work, copy and paste the following link into your browser:
          </Text>
          <Text className="text-zinc-500 break-all font-mono leading-loose p-6 bg-zinc-100  rounded-md text-xs lowercase">
            {href}
          </Text>
          <Text className="mt-8 text-xs text-zinc-800/40 text-balance leading-relaxed">
            This email will expire in 60 minutes, approximately at{" "}
            <span className="underline underline-offset-2 text-zinc-800/50">
              {formatTokenExpiry(expiresAt)}
            </span>
            .
            <br />
            If you did not request this email, please ignore it.
          </Text>
          <Section className="mt-8">
            <div className="text-3xl font-semibold text-foreground tracking-tighter text-center -mb-2 mt-12">
              auth<span className="text-zinc-400 dark:text-zinc-600 ">UI</span>
            </div>
            <p className="text-xs text-balance text-center mx-auto text-zinc-500">
              customizable auth components
            </p>
            <div>
              <p className="text-zinc-400 dark:text-zinc-600 text-xs text-center mx-auto -mt-2">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-medium text-md text-zinc-600">
                  auth<span className="text-zinc-400 dark:text-zinc-600">UI</span>
                </span>
                . All rights reserved.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs">
              <Link
                href="https://authui.atyb.me"
                className="text-zinc-400 dark:text-zinc-600 rounded-full p-1 flex items-center justify-center border-zinc-300"
              >
                <Img
                  height={16}
                  width={16}
                  alt="logo"
                  src={`${baseURL}/icons/PhGlobeSimple.png`}
                  className="size-4 opacity-40"
                />
              </Link>
              <Link
                href="https://github.com/atybdot/authui"
                className="text-zinc-400 dark:text-zinc-600 rounded-full p-1 flex items-center justify-center border-zinc-300"
              >
                <Img
                  height={16}
                  width={16}
                  alt="logo"
                  src={`${baseURL}/icons/PhGithubLogo.png`}
                  className="size-4 opacity-40"
                />
              </Link>
              <Link
                href="https://x.com/atybdot"
                className="text-zinc-400 dark:text-zinc-600 rounded-full p-1 flex items-center justify-center border-zinc-300"
              >
                <Img
                  height={16}
                  width={16}
                  alt="logo"
                  src={`${baseURL}/icons/PhXLogo.png`}
                  className="size-4 opacity-40"
                />
              </Link>
            </div>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;
