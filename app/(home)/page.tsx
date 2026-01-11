import Waitlist from "@/components/waitlist";
import { getUserCookies } from "@/actions/cookies";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import Logo from "@/components/Logo";

export default async function Home() {
  const userData = await getUserCookies();

  return (
    <section className="container mx-auto max-w-3xl px-4 py-8 **:cursor-default">
      <div className="flex flex-col items-center justify-between mt-24 md:mt-32">
        <AnimatedShinyText className="w-fit font-semibold mb-4 text-base md:text-lg">
          <span>coming soon</span>
        </AnimatedShinyText>
        <Logo className="text-6xl md:text-8xl" />
        <h3 className="text-md md:text-[24px] text-center">customizable auth components</h3>
      </div>
      <Waitlist userData={userData} />
    </section>
  );
}
