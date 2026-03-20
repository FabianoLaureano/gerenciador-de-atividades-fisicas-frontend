import Image from "next/image";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { AuthTabs } from "./_components/auth-tabs";
import { BackgroundCarousel } from "./_components/background-carousel";

export default async function AuthPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session.data?.user) redirect("/");

  return (
    <main className="flex min-h-svh justify-center bg-black p-0 lg:p-8 lg:pt-16">
      <div className="relative flex w-full max-w-[1400px] flex-col bg-black lg:w-fit lg:flex-row lg:rounded-[32px] lg:border lg:border-white/10 lg:shadow-2xl">
        {/* Background Section (Left on Desktop) */}
        <div className="relative h-[60vh] w-full lg:sticky lg:top-8 lg:h-[calc(100vh-128px)] lg:w-auto lg:aspect-[9/16] lg:shrink-0 lg:rounded-l-[32px] lg:overflow-hidden">
          <BackgroundCarousel />
          
          {/* Logo - Mobile Only (at the top) */}
          <div className="relative z-10 flex justify-center pt-12 lg:hidden">
            <Image src="/fit-ai-logo.svg" alt="FIT.AI" width={85} height={38} />
          </div>
        </div>

        {/* Form Section (Right on Desktop) */}
        <div className="relative z-10 -mt-20 flex flex-1 flex-col overflow-hidden rounded-t-[32px] border-t border-white/10 bg-black/10 px-5 pb-10 pt-10 backdrop-blur-xl lg:mt-0 lg:w-[500px] lg:items-center lg:justify-center lg:rounded-none lg:border-l lg:border-t-0 lg:bg-background lg:backdrop-blur-none lg:min-h-[calc(100vh-128px)]">
          <div className="flex w-full max-w-[400px] flex-col gap-8">
            {/* Logo - Desktop Only */}
            <div className="hidden justify-center lg:flex">
              <Image src="/fit-ai-logo.svg" alt="FIT.AI" width={120} height={54} />
            </div>

            <div className="flex flex-col gap-1.5 lg:text-center">
              <h1 className="font-heading text-[22px] font-semibold leading-[1.05] text-white lg:text-3xl">
                Gerencie suas atividades físicas e tenha ajuda de um assistente de
                IA.
              </h1>
              <p className="font-heading text-sm text-white/50 lg:text-base">
                Entre ou crie sua conta para começar.
              </p>
            </div>

            <AuthTabs />
          </div>
        </div>
      </div>
    </main>
  );
}
