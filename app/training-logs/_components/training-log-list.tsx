"use client";

import { useState } from "react";
import { TrainingLogCard } from "./training-log-card";
import { TrainingLogDetailModal } from "./training-log-detail-modal";
import type { GetTrainingLogs200Item } from "@/app/_lib/api/fetch-generated";

interface TrainingLogListProps {
  logs: GetTrainingLogs200Item[];
}

export function TrainingLogList({ logs }: TrainingLogListProps) {
  const [selectedLog, setSelectedLog] = useState<GetTrainingLogs200Item | null>(
    null,
  );

  return (
    <>
      <div className="flex flex-col gap-3">
        {logs.length === 0 ? (
          <p className="font-heading text-sm text-muted-foreground text-center py-10">
            Nenhum treino registrado ainda.
          </p>
        ) : (
          logs.map((log) => (
            <TrainingLogCard
              key={log.id}
              name={log.name}
              description={log.description}
              type={log.type ?? "outro"}
              createdAt={log.createdAt}
              onClick={() => setSelectedLog(log)}
            />
          ))
        )}
      </div>

      <TrainingLogDetailModal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
      />
    </>
  );
}
