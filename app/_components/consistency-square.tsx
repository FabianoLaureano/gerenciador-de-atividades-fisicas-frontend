interface ConsistencySquareProps {
  completed: boolean;
  started: boolean;
  isToday: boolean;
}

export function ConsistencySquare({
  completed,
  started,
  isToday,
}: ConsistencySquareProps) {
  if (completed) {
    return <div className="size-5 rounded-md bg-[#C5A065]" />;
  }

  if (started) {
    return <div className="size-5 rounded-md bg-[#C5A065]/20" />;
  }

  if (isToday) {
    return <div className="size-5 rounded-md border-[1.6px] border-[#C5A065]" />;
  }

  return <div className="size-5 rounded-md border border-white/5" />;
}
