"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

export function AuthTabs() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex rounded-full border border-white/10 bg-transparent p-1">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full py-2 font-heading text-sm font-semibold transition-all duration-200 ${
            mode === "login"
              ? "bg-[#C5A065] text-black shadow-sm"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          Entrar
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full py-2 font-heading text-sm font-semibold transition-all duration-200 ${
            mode === "signup"
              ? "bg-[#C5A065] text-black shadow-sm"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          Criar conta
        </button>
      </div>

      {mode === "login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
