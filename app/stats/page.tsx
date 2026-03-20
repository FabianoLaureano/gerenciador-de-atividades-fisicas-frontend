import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getStats } from "@/app/_lib/api/fetch-generated";
import dayjs from "dayjs";
import { CircleCheck, CirclePercent, Hourglass } from "lucide-react";
import { BottomNav } from "@/app/_components/bottom-nav";
import { StreakBanner } from "./_components/streak-banner";
import { StatsHeatmap } from "./_components/stats-heatmap";
import { StatCard } from "./_components/stat-card";
import { getSession } from "@/app/_lib/get-session";

function formatTotalTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h${minutes.toString().padStart(2, "0")}m`;
}

export default async function StatsPage() {
  const session = await getSession();
  if (!session) redirect("/auth");

  const today = dayjs();
  const from = today.subtract(2, "month").startOf("month").format("YYYY-MM-DD");
  const to = today.format("YYYY-MM-DD");

  const statsResponse = await getStats({ from, to });

  const hasStats = statsResponse.status === 200;

  const workoutStreak = hasStats ? statsResponse.data.workoutStreak : 0;
  const consistencyByDay = hasStats ? statsResponse.data.consistencyByDay : {};
  const completedWorkoutsCount = hasStats
    ? statsResponse.data.completedWorkoutsCount
    : 0;
  const conclusionRate = hasStats ? statsResponse.data.conclusionRate : 0;
  const totalTimeInSeconds = hasStats
    ? statsResponse.data.totalTimeInSeconds
    : 0;

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24 lg:mx-auto lg:max-w-[1240px]">
      <div className="flex h-14 items-center px-5 lg:h-20">
        <p
          className="text-[22px] uppercase leading-[1.15] text-foreground lg:text-3xl"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Fit.ai
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 px-5">
        <div className="flex flex-col gap-6">
          <StreakBanner workoutStreak={workoutStreak} />
          
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-lg font-semibold text-foreground lg:text-2xl">
              Consistência
            </h2>
            <StatsHeatmap consistencyByDay={consistencyByDay} today={today} />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:pt-14">
          <div className="grid grid-cols-2 gap-3 lg:gap-6">
            <StatCard
              icon={CircleCheck}
              value={String(completedWorkoutsCount)}
              label="Treinos Feitos"
            />
            <StatCard
              icon={CirclePercent}
              value={`${Math.round(conclusionRate * 100)}%`}
              label="Taxa de conclusão"
            />
          </div>

          <StatCard
            icon={Hourglass}
            value={formatTotalTime(totalTimeInSeconds)}
            label="Tempo Total (Plano de treino)"
          />
        </div>
      </div>

      <BottomNav activePage="stats" />
    </div>
  );
}
