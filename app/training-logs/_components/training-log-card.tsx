import Image from "next/image";
import { Calendar, NotebookPen } from "lucide-react";
import dayjs from "dayjs";

const TYPE_IMAGES: Record<string, string> = {
  musculacao_superior: `${process.env.NEXT_PUBLIC_API_URL}/public/superior1.jpg`,
  musculacao: `${process.env.NEXT_PUBLIC_API_URL}/public/superior1.jpg`,
  calistenia: `${process.env.NEXT_PUBLIC_API_URL}/public/calistenia.jpg`,
  crossfit: `${process.env.NEXT_PUBLIC_API_URL}/public/cross.jpg`,
  corrida: `${process.env.NEXT_PUBLIC_API_URL}/public/corrida.jpg`,
  luta: `${process.env.NEXT_PUBLIC_API_URL}/public/luta.jpg`,
  hibrido: `${process.env.NEXT_PUBLIC_API_URL}/public/hibrido.jpg`,
  outro: `${process.env.NEXT_PUBLIC_API_URL}/public/rest.jpg`,
};

interface TrainingLogCardProps {
  name: string;
  description?: string | null;
  type: string;
  createdAt: string;
  onClick?: () => void;
}

export function TrainingLogCard({
  name,
  description,
  type,
  createdAt,
  onClick,
}: TrainingLogCardProps) {
  const imageUrl = TYPE_IMAGES[type] ?? TYPE_IMAGES.outro;

  return (
    <div
      className={`relative flex h-[200px] w-full flex-col items-start justify-between overflow-hidden rounded-xl p-5 active:scale-[0.98] transition-transform duration-150 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="pointer-events-none object-cover brightness-90 contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="relative">
        <div className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 backdrop-blur-sm border border-white/5">
          <Calendar className="size-3.5 text-white" />
          <span className="font-heading text-xs font-semibold uppercase text-white">
            {dayjs(createdAt).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 min-w-0 w-full">
        <h3 className="font-heading text-2xl font-semibold leading-[1.05] text-white">
          {name}
        </h3>
        {description && (
          <div className="flex items-center gap-1 min-w-0">
            <NotebookPen className="size-3.5 text-white/70 shrink-0" />
            <span className="font-heading text-xs text-white/70 line-clamp-1 min-w-0">
              {description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
