"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTrainingLogAction } from "@/app/_actions/create-training-log.action";

const TRAINING_TYPES = [
  { value: "musculacao", label: "Musculação" },
  { value: "calistenia", label: "Calistenia" },
  { value: "crossfit", label: "Crossfit" },
  { value: "corrida", label: "Corrida" },
  { value: "luta", label: "Luta" },
  { value: "hibrido", label: "Híbrido" },
  { value: "outro", label: "Outro" },
];

interface TrainingLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrainingLogModal({ isOpen, onClose }: TrainingLogModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("musculacao");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await createTrainingLogAction({
        name: name.trim() || undefined,
        description: description.trim() || undefined,
        type,
      });
      router.refresh();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-foreground/30" onClick={onClose} />
      <div className="relative z-10 w-full rounded-[20px] bg-background p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Registrar Treino
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nome do treino (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-border bg-background px-4 py-3 font-heading text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="rounded-xl border border-border bg-background px-4 py-3 font-heading text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
          />
          <div className="flex flex-wrap gap-2">
            {TRAINING_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`rounded-full px-4 py-2 font-heading text-sm font-semibold transition-colors ${
                  type === t.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full rounded-full"
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
