"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createUserGoalAction } from "@/app/_actions/create-user-goal.action";

interface UserGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserGoalModal({ isOpen, onClose }: UserGoalModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setIsLoading(true);
    try {
      await createUserGoalAction({
        title: title.trim(),
        currentValue: currentValue.trim() || undefined,
        targetValue: targetValue.trim() || undefined,
      });
      router.refresh();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full rounded-[20px] bg-card p-5 flex flex-col gap-5 border border-white/5 shadow-2xl lg:max-w-md lg:mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-white">
            Nova Meta
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10">
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Meta (ex: Chegar em 70kg)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-white/5 bg-secondary/50 px-4 py-3 font-heading text-sm text-white placeholder:text-muted-foreground outline-none focus:border-[#C5A065]/50 transition-colors"
          />
          <input
            type="text"
            placeholder="Valor atual (opcional, ex: 65kg)"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="rounded-xl border border-white/5 bg-secondary/50 px-4 py-3 font-heading text-sm text-white placeholder:text-muted-foreground outline-none focus:border-[#C5A065]/50 transition-colors"
          />
          <input
            type="text"
            placeholder="Valor alvo (opcional, ex: 70kg)"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            className="rounded-xl border border-white/5 bg-secondary/50 px-4 py-3 font-heading text-sm text-white placeholder:text-muted-foreground outline-none focus:border-[#C5A065]/50 transition-colors"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !title.trim()}
          className="w-full rounded-full bg-[#C5A065] text-black font-semibold hover:bg-[#B8935A] active:scale-[0.98] transition-all border-none"
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
