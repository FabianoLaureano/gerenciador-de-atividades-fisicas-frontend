"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

interface TrainingLogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: {
    name: string;
    description?: string | null;
    createdAt: string;
  } | null;
}

export function TrainingLogDetailModal({
  isOpen,
  onClose,
  log,
}: TrainingLogDetailModalProps) {
  if (!isOpen || !log) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-foreground/30" onClick={onClose} />
      <div className="relative z-10 w-full rounded-[20px] bg-background p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {log.name}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        <span className="font-heading text-xs text-muted-foreground">
          {dayjs(log.createdAt).format("DD/MM/YYYY")}
        </span>

        {log.description ? (
          <p className="font-heading text-sm text-foreground leading-relaxed break-words overflow-hidden">
            {log.description}
          </p>
        ) : (
          <p className="font-heading text-sm text-muted-foreground">
            Sem descrição.
          </p>
        )}
      </div>
    </div>
  );
}
