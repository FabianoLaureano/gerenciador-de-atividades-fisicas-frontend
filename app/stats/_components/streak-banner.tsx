import Image from "next/image";
import { Flame } from "lucide-react";

interface StreakBannerProps {
  workoutStreak: number;
}

export function StreakBanner({ workoutStreak }: StreakBannerProps) {
  const isZero = workoutStreak === 0;

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl px-5 py-10">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/stats-banner.png"
          alt=""
          fill
          className={`object-cover brightness-90 contrast-125 ${isZero ? "grayscale" : ""}`}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      <div className="relative flex flex-col items-center gap-3">
        <div className="rounded-full border border-white/5 bg-white/10 p-3 backdrop-blur-sm">
          <Flame className={`size-8 ${isZero ? "text-white/70" : "text-[#C5A065]"}`} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className={`font-heading text-5xl font-semibold leading-[0.95] tabular-nums ${isZero ? "text-white/70" : "text-[#C5A065]"}`}>
            {workoutStreak} dias
          </p>
          <p className="font-heading text-base font-medium leading-[1.15] text-white/70">
            Sequência Atual
          </p>
        </div>
      </div>
    </div>
  );
}
