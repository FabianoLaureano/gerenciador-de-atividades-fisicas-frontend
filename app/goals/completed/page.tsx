import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getUserGoals } from "@/app/_lib/api/fetch-generated";
import { BottomNav } from "@/app/_components/bottom-nav";
import { BackButton } from "@/app/workout-plans/[id]/days/[dayId]/_components/back-button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import dayjs from "dayjs";
import { getSession } from "@/app/_lib/get-session";

export default async function CompletedGoalsPage() {
  const session = await getSession();
  if (!session) redirect("/auth");

  const goalsData = await getUserGoals();

  if (goalsData.status !== 200) {
    throw new Error("Failed to fetch goals");
  }

  const completedGoals = goalsData.data.filter((g) => g.completedAt);

  return (
    <main className="flex min-h-svh justify-center bg-black p-0 lg:p-8 lg:pt-16">
      <div className="relative flex w-full max-w-[1400px] flex-col bg-background lg:w-fit lg:flex-row lg:rounded-[32px] lg:border lg:border-white/10 lg:shadow-2xl">
        {/* Left Side: Image (Desktop only) or Hero (Mobile) */}
        <div className="relative flex h-[296px] shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-[20px] px-5 pb-10 pt-5 lg:sticky lg:top-8 lg:h-[calc(100vh-128px)] lg:w-auto lg:aspect-[9/16] lg:shrink-0 lg:rounded-l-[32px] lg:rounded-br-none lg:bg-card">
          <div className="absolute inset-0" aria-hidden="true">
            {/* Main Image - Centered and preserving 9:16 */}
            <div className="relative mx-auto h-full max-w-full">
              <Image
                src="/workout-plan-banner.png"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
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
                <Trophy className="size-4 lg:size-5" />
                Histórico
              </Badge>
              <h1 className="font-heading text-2xl font-semibold leading-[1.05] text-background lg:text-5xl lg:text-foreground">
                Metas Concluídas
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 flex flex-col gap-3 px-5 pt-5 lg:gap-6 lg:pt-10 lg:w-[500px] lg:pb-32">
          <div className="hidden lg:flex items-center justify-between mb-5">
             <BackButton />
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-1 lg:gap-6">
            {completedGoals.length === 0 ? (
              <p className="font-heading text-sm text-muted-foreground text-center py-10">
                Nenhuma meta concluída ainda.
              </p>
            ) : (
              completedGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex flex-col gap-2 rounded-xl border border-border p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-base font-semibold text-foreground">
                      {goal.title}
                    </p>
                    <span className="font-heading text-xs text-muted-foreground">
                      {dayjs(goal.completedAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  {(goal.currentValue || goal.targetValue) && (
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm text-muted-foreground">
                        {goal.currentValue ?? "-"}
                      </span>
                      <span className="font-heading text-xs text-muted-foreground">
                        →
                      </span>
                      <span className="font-heading text-sm text-primary">
                        {goal.targetValue ?? "-"}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <BottomNav activePage="profile" />
    </main>
  );
}
