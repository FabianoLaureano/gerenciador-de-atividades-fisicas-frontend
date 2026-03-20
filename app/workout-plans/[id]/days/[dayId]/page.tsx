import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import {
  getWorkoutDay,
  getHomeData,
  getUserTrainData,
} from "@/app/_lib/api/fetch-generated";
import dayjs from "dayjs";
import Image from "next/image";
import { Calendar, Timer, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/app/_components/bottom-nav";
import { BackButton } from "./_components/back-button";
import { ExerciseCard } from "./_components/exercise-card";
import { StartWorkoutButton } from "./_components/start-workout-button";
import { CompleteWorkoutButton } from "./_components/complete-workout-button";
import { getSession } from "@/app/_lib/get-session";

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

const WEEKDAY_TITLE_LABELS: Record<string, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export default async function WorkoutDayPage({
  params,
}: {
  params: Promise<{ id: string; dayId: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/auth");

  const { id: workoutPlanId, dayId } = await params;
  const [workoutDayData, homeData, trainData] = await Promise.all([
    getWorkoutDay(workoutPlanId, dayId),
    getHomeData(dayjs().format("YYYY-MM-DD")),
    getUserTrainData(),
  ]);

  const needsOnboarding =
    (homeData.status === 200 && !homeData.data.activeWorkoutPlanId) ||
    (trainData.status === 200 && !trainData.data);
  if (needsOnboarding) redirect("/onboarding");

  if (workoutDayData.status !== 200) redirect("/");

  const {
    name,
    weekDay,
    estimatedDurationInSeconds,
    exercises,
    workoutSessions,
    coverImageUrl,
  } = workoutDayData.data;

  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);

  const inProgressSession = workoutSessions.find(
    (s) => s.startedAt && !s.completedAt,
  );
  const completedSession = workoutSessions.find((s) => s.completedAt);
  const hasInProgressSession = !!inProgressSession;
  const hasCompletedSession = !!completedSession;

  return (
    <main className="flex min-h-svh justify-center bg-black p-0 lg:p-8 lg:pt-16">
      <div className="relative flex w-full max-w-[1400px] flex-col bg-background lg:w-fit lg:flex-row lg:rounded-[32px] lg:border lg:border-white/10 lg:shadow-2xl">
        {/* Left Side: Image (Desktop only) or Hero (Mobile) */}
        <div className="relative flex h-[296px] shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-[20px] px-5 pb-10 pt-5 lg:sticky lg:top-8 lg:h-[calc(100vh-128px)] lg:w-auto lg:aspect-[9/16] lg:shrink-0 lg:rounded-l-[32px] lg:rounded-br-none lg:bg-card">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="relative h-full w-full">
              {coverImageUrl && (
                <Image
                  src={coverImageUrl}
                  alt={name}
                  fill
                  className="pointer-events-none object-cover brightness-90 contrast-125"
                  priority
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent lg:hidden" />
          </div>

          <div className="relative flex w-full items-center justify-between">
            <div className="lg:hidden">
              <BackButton />
            </div>
            <h1 className="font-heading text-lg font-semibold text-white lg:text-3xl lg:text-foreground">
              {hasInProgressSession || hasCompletedSession
                ? "Treino de Hoje"
                : WEEKDAY_TITLE_LABELS[weekDay]}
            </h1>
            <div className="size-6 lg:hidden" />
            <div className="hidden lg:block">
              <p
                className="text-[22px] uppercase leading-[1.15] text-foreground lg:text-3xl"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                Fit.ai
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 backdrop-blur-sm border border-white/5 lg:px-4 lg:py-2 lg:bg-black/5 lg:border-black/5">
              <Calendar className="size-3.5 text-white lg:text-foreground lg:size-5" />
              <span className="font-heading text-xs font-semibold uppercase text-white lg:text-foreground lg:text-sm">
                {WEEKDAY_LABELS[weekDay]}
              </span>
            </div>
          </div>

          <div className="relative flex w-full items-end justify-between">
            <div className="flex flex-col gap-2 lg:gap-4">
              <h2 className="font-heading text-2xl font-semibold leading-[1.05] text-white lg:text-5xl lg:text-foreground">
                {name}
              </h2>
              <div className="flex items-start gap-2">
                <div className="flex items-center gap-1">
                  <Timer className="size-3.5 text-white/70 lg:text-foreground/70 lg:size-5" />
                  <span className="font-heading text-xs text-white/70 lg:text-foreground/70 lg:text-base">
                    {durationInMinutes}min
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="size-3.5 text-white/70 lg:text-foreground/70 lg:size-5" />
                  <span className="font-heading text-xs text-white/70 lg:text-foreground/70 lg:text-base">
                    {exercises.length} exercícios
                  </span>
                </div>
              </div>
            </div>

            {!hasInProgressSession && !hasCompletedSession && (
              <div className="scale-100 lg:scale-125 lg:origin-bottom-right">
                <StartWorkoutButton
                  workoutPlanId={workoutPlanId}
                  workoutDayId={dayId}
                />
              </div>
            )}
            {hasCompletedSession && (
              <Button
                variant="ghost"
                disabled
                className="rounded-full px-4 py-2 font-heading text-sm font-semibold text-white/50 hover:bg-transparent hover:text-white/50 border border-white/5 bg-white/5 lg:px-8 lg:py-4 lg:text-lg lg:bg-black/5 lg:text-black/50 lg:border-black/5"
              >
                Concluído!
              </Button>
            )}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 flex flex-col gap-3 p-5 lg:gap-6 lg:pt-10 lg:w-[700px] lg:pb-32">
          <div className="hidden lg:flex items-center justify-between mb-5">
             <BackButton />
          </div>

          <div className="grid grid-cols-1 gap-3 lg:gap-6">
            {exercises
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
          </div>

          {hasInProgressSession && inProgressSession && (
            <div className="pt-5 lg:pt-10">
              <CompleteWorkoutButton
                workoutPlanId={workoutPlanId}
                workoutDayId={dayId}
                sessionId={inProgressSession.id}
              />
            </div>
          )}
        </div>
      </div>

      <BottomNav activePage="calendar" />
    </main>
  );
}
