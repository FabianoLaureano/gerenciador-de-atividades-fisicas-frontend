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
    <div className="relative flex min-h-svh flex-col bg-black">
      <BackgroundCarousel />

      <div className="relative z-10 flex justify-center pt-12">
        <Image src="/fit-ai-logo.svg" alt="FIT.AI" width={85} height={38} />
      </div>

      <div className="flex-1" />

      <div className="relative z-10 flex flex-col gap-6 rounded-t-[32px] border-t border-white/10 bg-black/10 px-5 pb-10 pt-10 backdrop-blur-xl">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-[22px] font-semibold leading-[1.05] text-white">
            Gerencie suas atividades físicas e tenha ajuda de um assistente de
            IA.
          </h1>
          <p className="font-heading text-sm text-white/50">
            Entre ou crie sua conta para começar.
          </p>
        </div>

        <AuthTabs />
      </div>
    </div>
  );
}
