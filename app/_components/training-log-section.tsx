"use client";

import { useState } from "react";
import { TrainingLogModal } from "./training-log-modal";
import type { GetTrainingLogs200Item } from "@/app/_lib/api/fetch-generated";
import Link from "next/link";
import { TrainingLogCard } from "@/app/training-logs/_components/training-log-card";

interface TrainingLogSectionProps {
  latestTrainingLog: GetTrainingLogs200Item | null;
}

export function TrainingLogSection({
  latestTrainingLog,
}: TrainingLogSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Outros Treinos
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-heading text-xs text-primary"
            >
              + Adicionar
            </button>
            <Link
              href="/training-logs"
              className="font-heading text-xs text-primary"
            >
              Ver histórico
            </Link>
          </div>
        </div>

        {latestTrainingLog ? (
          <TrainingLogCard
            name={latestTrainingLog.name}
            description={latestTrainingLog.description}
            type={latestTrainingLog.type ?? "outro"}
            createdAt={latestTrainingLog.createdAt}
          />
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center rounded-xl border border-dashed border-border p-5 font-heading text-sm text-muted-foreground"
          >
            + Registrar treino de hoje
          </button>
        )}
      </div>

      <TrainingLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
