import Image from "next/image";
import { Flame } from "lucide-react";

interface StreakBannerProps {
  workoutStreak: number;
}

export function StreakBanner({ workoutStreak }: StreakBannerProps) {
  const isZero = workoutStreak === 0;

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl px-5 py-10 lg:h-[400px] lg:rounded-[32px]">
      <div className="absolute inset-0" aria-hidden="true">
        {/* Background Blurred Image - Desktop Only */}
        <Image
          src="/stats-banner.png"
          alt=""
          fill
          className={`hidden object-cover brightness-50 blur-3xl lg:block ${isZero ? "grayscale" : ""}`}
        />
        {/* Main Image */}
        <div className="relative mx-auto h-full max-w-full lg:aspect-[9/16]">
          <Image
            src="/stats-banner.png"
            alt=""
            fill
            className={`object-cover brightness-90 contrast-125 ${isZero ? "grayscale" : ""}`}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      <div className="relative flex flex-col items-center gap-3 lg:gap-6">
        <div className="rounded-full border border-white/5 bg-white/10 p-3 backdrop-blur-sm lg:p-6">
          <Flame className={`size-8 lg:size-12 ${isZero ? "text-white/70" : "text-[#C5A065]"}`} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className={`font-heading text-5xl font-semibold leading-[0.95] tabular-nums lg:text-7xl ${isZero ? "text-white/70" : "text-[#C5A065]"}`}>
            {workoutStreak} dias
          </p>
          <p className="font-heading text-base font-medium leading-[1.15] text-white/70 lg:text-xl">
            Sequência Atual
          </p>
        </div>
      </div>
    </div>
  );
}
