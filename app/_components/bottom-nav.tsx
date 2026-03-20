import Link from "next/link";
import { House, Calendar, ChartNoAxesColumn, UserRound } from "lucide-react";
import dayjs from "dayjs";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";
import { ChatOpenButton } from "@/app/_components/chat-open-button";

interface BottomNavProps {
  activePage?: "home" | "calendar" | "stats" | "profile";
}

export async function BottomNav({ activePage = "home" }: BottomNavProps) {
  const today = dayjs();
  const homeData = await getHomeData(today.format("YYYY-MM-DD"));

  const calendarHref =
    homeData.status === 200 && homeData.data.activeWorkoutPlanId
      ? `/workout-plans/${homeData.data.activeWorkoutPlanId}`
      : null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6 border-t border-white/5 bg-background/70 px-6 py-4 backdrop-blur-md">
      <Link href="/" className="p-3">
        <House
          className={cn(
            "size-6 transition-colors duration-200",
            activePage === "home" ? "text-[#C5A065]" : "text-muted-foreground",
          )}
        />
      </Link>
      {calendarHref ? (
        <Link href={calendarHref} className="p-3">
          <Calendar
             className={cn(
              "size-6 transition-colors duration-200",
              activePage === "calendar"
                ? "text-[#C5A065]"
                : "text-muted-foreground",
            )}
          />
        </Link>
      ) : (
        <button className="p-3">
          <Calendar
            className={cn(
              "size-6 transition-colors duration-200",
              activePage === "calendar"
                ? "text-[#C5A065]"
                : "text-muted-foreground",
            )}
          />
        </button>
      )}
      <ChatOpenButton />
      <Link href="/stats" className="p-3">
        <ChartNoAxesColumn
          className={cn(
            "size-6 transition-colors duration-200",
            activePage === "stats"
              ? "text-[#C5A065]"
              : "text-muted-foreground",
          )}
        />
      </Link>
      <Link href="/profile" className="p-3">
        <UserRound
          className={cn(
            "size-6 transition-colors duration-200",
            activePage === "profile"
              ? "text-[#C5A065]"
              : "text-muted-foreground",
          )}
        />
      </Link>
    </nav>
  );
}
