import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getTrainingLogs } from "@/app/_lib/api/fetch-generated";
import { BottomNav } from "@/app/_components/bottom-nav";
import { BackButton } from "@/app/workout-plans/[id]/days/[dayId]/_components/back-button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ClipboardList } from "lucide-react";
import dayjs from "dayjs";
import { getSession } from "@/app/_lib/get-session";
import { TrainingLogCard } from "@/app/training-logs/_components/training-log-card";
import { TrainingLogList } from "@/app/training-logs/_components/training-log-list";

export default async function TrainingLogsPage() {
  const session = await getSession();
  if (!session) redirect("/auth");

  const trainingLogsData = await getTrainingLogs();

  if (trainingLogsData.status !== 200) {
    throw new Error("Failed to fetch training logs");
  }

  const logs = trainingLogsData.data.slice(0, 5);

  return (
    <main className="flex min-h-svh justify-center bg-black p-0 lg:p-8 lg:pt-16">
      <div className="relative flex w-full max-w-[1400px] flex-col bg-background lg:w-fit lg:flex-row lg:rounded-[32px] lg:border lg:border-white/10 lg:shadow-2xl">
        {/* Left Side: Image (Desktop only) or Hero (Mobile) */}
        <div className="relative flex h-[296px] shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-[20px] px-5 pb-10 pt-5 lg:sticky lg:top-8 lg:h-[calc(100vh-128px)] lg:w-auto lg:aspect-[9/16] lg:shrink-0 lg:rounded-l-[32px] lg:rounded-br-none lg:bg-card">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/workout-plan-banner.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:hidden"
            />
          </div>

          <div className="relative flex w-full items-center justify-between">
            <p
              className="text-[22px] uppercase leading-[1.15] text-background lg:text-3xl lg:text-foreground"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              Fit.ai
            </p>
            <div className="lg:hidden">
              <BackButton />
            </div>
          </div>

          <div className="relative flex w-full items-end justify-between">
            <div className="flex flex-col gap-3 lg:gap-6">
              <Badge className="w-fit gap-1 rounded-full px-2.5 py-1.5 font-heading text-xs font-semibold uppercase lg:px-4 lg:py-2 lg:text-sm">
                <ClipboardList className="size-4 lg:size-5" />
                Histórico
              </Badge>
              <h1 className="font-heading text-2xl font-semibold leading-[1.05] text-background lg:text-5xl lg:text-foreground">
                Treinos e Outras Atividades
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 flex flex-col gap-3 px-5 pt-5 lg:gap-6 lg:pt-10 lg:w-[500px] lg:pb-32">
          <div className="hidden lg:flex items-center justify-between mb-5">
             <BackButton />
          </div>
          
          {logs.length === 0 ? (
            <p className="font-heading text-sm text-muted-foreground text-center py-10 lg:text-lg">
              Nenhum treino registrado ainda.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              <TrainingLogList logs={logs} />
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
