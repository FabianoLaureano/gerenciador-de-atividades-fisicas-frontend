"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/app/_lib/auth";
import { SignInWithGoogle } from "./sign-in-with-google";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        },
      );

      if (!response.ok) {
        setError("Erro ao criar conta. Tente novamente.");
        return;
      }

      // após cadastro faz login automaticamente
      const loginResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await loginResponse.json();
      saveToken(data.token);
      router.push("/");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-heading text-sm text-white placeholder:text-white/40 outline-none focus:border-[#C5A065]/50 transition-colors"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-heading text-sm text-white placeholder:text-white/40 outline-none focus:border-[#C5A065]/50 transition-colors"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-heading text-sm text-white placeholder:text-white/40 outline-none focus:border-[#C5A065]/50 transition-colors"
        />
        {error && <p className="font-heading text-xs text-red-400">{error}</p>}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full rounded-full bg-[#C5A065] py-3 font-heading text-sm font-semibold text-black hover:bg-[#B8935A] active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {isLoading ? "Criando conta..." : "Criar conta"}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-heading text-xs text-white/40">ou</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <SignInWithGoogle />
    </div>
  );
}
