import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getHomeData, getTrainingLogs } from "./_lib/api/fetch-generated";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { BottomNav } from "./_components/bottom-nav";
import { ConsistencyTracker } from "./_components/consistency-tracker";
import { WorkoutDayCard } from "./_components/workout-day-card";
import { TrainingLogSection } from "./_components/training-log-section";
import { getSession } from "./_lib/get-session";

export default async function Home() {
  const session = await getSession();
  if (!session) redirect("/auth");
  const userName = session.name.split(" ")[0];

  const today = dayjs();

  const [homeData, trainingLogsData] = await Promise.all([
    getHomeData(today.format("YYYY-MM-DD")),
    getTrainingLogs(),
  ]);

  const hasActivePlan =
    homeData.status === 200 && homeData.data.activeWorkoutPlanId;
  const todayWorkoutDay = hasActivePlan ? homeData.data.todayWorkoutDay : null;
  const workoutStreak = hasActivePlan ? homeData.data.workoutStreak : 0;
  const consistencyByDay = hasActivePlan ? homeData.data.consistencyByDay : {};

  const latestTrainingLog =
    trainingLogsData.status === 200 && trainingLogsData.data.length > 0
      ? trainingLogsData.data[0]
      : null;

  return (
    <main className="flex min-h-svh justify-center bg-black p-0 lg:p-8 lg:pt-16">
      <div className="relative flex w-full max-w-[1400px] flex-col bg-background lg:w-fit lg:flex-row lg:rounded-[32px] lg:border lg:border-white/10 lg:shadow-2xl">
        {/* Left Side: Hero (Desktop) / Mobile Header */}
        <div className="relative flex h-[296px] shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-[20px] px-5 pb-10 pt-5 lg:sticky lg:top-8 lg:h-[calc(100vh-128px)] lg:w-auto lg:aspect-[9/16] lg:rounded-l-[32px] lg:rounded-br-none lg:bg-card">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/home-banner.jpg"
              alt=""
              fill
              className="object-cover brightness-90 contrast-125"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent lg:hidden" />
          </div>

          <p
            className="relative text-[22px] uppercase leading-[1.15] text-white lg:text-3xl lg:text-foreground"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Fit.ai
          </p>

          <div className="relative flex w-full items-end justify-between">
            <div className="flex flex-col gap-1.5">
              <h1 className="font-heading text-2xl font-semibold leading-[1.05] text-white lg:text-5xl lg:text-foreground">
                Olá, {userName}
              </h1>
              <p className="font-heading text-sm leading-[1.15] text-white/70 lg:text-xl lg:text-foreground/70">
                Bora treinar hoje?
              </p>
            </div>
            <div className="rounded-full bg-[#C5A065] px-4 py-2 hover:bg-[#B8935A] active:scale-[0.98] transition-all cursor-pointer lg:px-8 lg:py-4">
              <span className="font-heading text-sm font-semibold text-black lg:text-lg">
                Bora!
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 flex flex-col gap-8 pb-32 lg:pb-10 lg:w-[500px]">
          {hasActivePlan && (
            <div className="flex flex-col gap-3 px-5 pt-5 lg:gap-6 lg:pt-10">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold text-foreground lg:text-2xl">
                  Consistência
                </h2>
                <Link
                  href="/stats"
                  className="font-heading text-xs text-primary lg:text-sm"
                >
                  Ver histórico
                </Link>
              </div>

              <div className="flex items-stretch gap-3 lg:gap-6">
                <div className="flex-1 rounded-xl border border-border p-5 lg:p-8">
                  <ConsistencyTracker
                    consistencyByDay={consistencyByDay}
                    today={today}
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-streak px-4 lg:gap-4 lg:px-10 lg:py-8">
                  <Flame className="size-5 text-streak-foreground lg:size-8" />
                  <span className="font-heading text-lg font-semibold text-foreground lg:text-3xl">
                    {workoutStreak}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 px-5 lg:pt-5">
            {todayWorkoutDay && (
              <div className="flex flex-col gap-3 pt-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-semibold text-foreground lg:text-2xl">
                    Treino de Hoje
                  </h2>
                  <Link
                    href={`/workout-plans/${todayWorkoutDay.workoutPlanId}`}
                    className="font-heading text-xs text-primary lg:text-sm"
                  >
                    Ver treinos
                  </Link>
                </div>

                <Link
                  href={`/workout-plans/${todayWorkoutDay.workoutPlanId}/days/${todayWorkoutDay.id}`}
                >
                  <WorkoutDayCard
                    name={todayWorkoutDay.name}
                    weekDay={todayWorkoutDay.weekDay}
                    estimatedDurationInSeconds={
                      todayWorkoutDay.estimatedDurationInSeconds
                    }
                    exercisesCount={todayWorkoutDay.exercisesCount}
                    coverImageUrl={todayWorkoutDay.coverImageUrl}
                  />
                </Link>
              </div>
            )}

            <div className="flex flex-col pt-5">
              <TrainingLogSection latestTrainingLog={latestTrainingLog} />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
