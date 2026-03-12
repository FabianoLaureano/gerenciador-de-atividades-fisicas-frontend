"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "@/app/_lib/auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/auth");
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="gap-2 text-destructive hover:text-destructive"
    >
      <span className="font-heading text-base font-semibold">
        Sair da conta
      </span>
      <LogOut className="size-4" />
    </Button>
  );
}
