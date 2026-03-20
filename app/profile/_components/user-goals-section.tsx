"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { UserGoalModal } from "@/app/_components/user-goal-modal";
import {
  completeUserGoalAction,
  updateGoalProgressAction,
} from "@/app/_actions/user-goal.actions";
import type { GetUserGoals200Item } from "@/app/_lib/api/fetch-generated";

interface UserGoalsSectionProps {
  goals: GetUserGoals200Item[];
}

export function UserGoalsSection({ goals }: UserGoalsSectionProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState("");

  const activeGoals = goals.filter((g) => !g.completedAt);

  const handleUpdateProgress = async (goalId: string) => {
    if (!progressValue.trim()) return;
    await updateGoalProgressAction(goalId, progressValue.trim());
    setEditingGoalId(null);
    setProgressValue("");
    router.refresh();
  };

  const handleComplete = async (goalId: string) => {
    await completeUserGoalAction(goalId);
    router.refresh();
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-white">
            Minhas Metas
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-heading text-xs font-semibold text-[#C5A065] hover:text-[#B8935A] transition-colors"
            >
              + Adicionar
            </button>
            <Link
              href="/goals/completed"
              className="font-heading text-xs font-semibold text-[#C5A065] hover:text-[#B8935A] transition-colors"
            >
              Ver concluídas
            </Link>
          </div>
        </div>

        {activeGoals.length === 0 ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center rounded-xl border border-dashed border-white/10 p-5 font-heading text-sm text-muted-foreground hover:bg-white/5 transition-colors"
          >
            + Adicionar meta
          </button>
        ) : (
          activeGoals.map((goal) => (
            <div
              key={goal.id}
              className="flex flex-col gap-3 rounded-xl border border-white/5 bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-heading text-base font-semibold text-white">
                  {goal.title}
                </p>
                <button
                  onClick={() => handleComplete(goal.id)}
                  className="flex items-center justify-center rounded-full bg-[#C5A065]/10 p-1.5 hover:bg-[#C5A065]/20 transition-colors"
                >
                  <Check className="size-3.5 text-[#C5A065]" />
                </button>
              </div>

              {(goal.currentValue || goal.targetValue) && (
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm tabular-nums text-muted-foreground">
                    {goal.currentValue ?? "-"}
                  </span>
                  <span className="font-heading text-xs text-muted-foreground/50">
                    →
                  </span>
                  <span className="font-heading text-sm tabular-nums font-semibold text-[#C5A065]">
                    {goal.targetValue ?? "-"}
                  </span>
                </div>
              )}

              {editingGoalId === goal.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Novo valor"
                    value={progressValue}
                    onChange={(e) => setProgressValue(e.target.value)}
                    className="flex-1 rounded-xl border border-white/5 bg-secondary/50 px-3 py-2 font-heading text-sm text-white placeholder:text-muted-foreground outline-none focus:border-[#C5A065]/50 transition-colors"
                  />
                  <button
                    onClick={() => handleUpdateProgress(goal.id)}
                    className="rounded-xl bg-[#C5A065] px-3 py-2 font-heading text-xs font-semibold text-black active:scale-[0.98] transition-all"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingGoalId(null)}
                    className="rounded-xl border border-white/5 px-3 py-2 font-heading text-xs text-muted-foreground hover:bg-white/5"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditingGoalId(goal.id);
                    setProgressValue(goal.currentValue ?? "");
                  }}
                  className="font-heading text-xs font-semibold text-[#C5A065]/80 hover:text-[#C5A065] text-left transition-colors"
                >
                  Atualizar progresso
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <UserGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
