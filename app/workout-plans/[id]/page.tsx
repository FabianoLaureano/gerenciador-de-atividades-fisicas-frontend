import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import {
  getWorkoutPlan,
  getHomeData,
  getUserTrainData,
} from "@/app/_lib/api/fetch-generated";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/app/_components/bottom-nav";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";
import { RestDayCard } from "./_components/rest-day-card";
import { BackButton } from "./days/[dayId]/_components/back-button";
import { getSession } from "@/app/_lib/get-session";

const WEEKDAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default async function WorkoutPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/auth");

  const { id } = await params;
  const [workoutPlanData, homeData, trainData] = await Promise.all([
    getWorkoutPlan(id),
    getHomeData(dayjs().format("YYYY-MM-DD")),
    getUserTrainData(),
  ]);

  const needsOnboarding =
    (homeData.status === 200 && !homeData.data.activeWorkoutPlanId) ||
    (trainData.status === 200 && !trainData.data);
  if (needsOnboarding) redirect("/onboarding");

  if (workoutPlanData.status !== 200) redirect("/");

  const { name, workoutDays } = workoutPlanData.data;

  const sortedDays = [...workoutDays].sort(
    (a, b) =>
      WEEKDAY_ORDER.indexOf(a.weekDay) - WEEKDAY_ORDER.indexOf(b.weekDay),
  );

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
              className="text-[22px] uppercase leading-[1.15] text-white lg:text-3xl lg:text-foreground"
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
                <Dumbbell className="size-4 lg:size-5" />
                Treinos
              </Badge>
              <h1 className="font-heading text-2xl font-semibold leading-[1.05] text-white lg:text-5xl lg:text-foreground">
                Plano de Treino
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 flex flex-col gap-3 p-5 lg:gap-6 lg:pt-10 lg:w-[700px] lg:pb-32">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
            {sortedDays.map((day) =>
              day.isRest ? (
                <RestDayCard key={day.id} weekDay={day.weekDay} />
              ) : (
                <Link key={day.id} href={`/workout-plans/${id}/days/${day.id}`}>
                  <WorkoutDayCard
                    name={day.name}
                    weekDay={day.weekDay}
                    estimatedDurationInSeconds={day.estimatedDurationInSeconds}
                    exercisesCount={day.exercisesCount}
                    coverImageUrl={day.coverImageUrl}
                  />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>

      <BottomNav activePage="calendar" />
    </main>
  );
}
