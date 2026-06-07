"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/button";
import { Input, Label, TextField } from "@heroui/react";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true); // only here, not in onRequest

    await authClient.signIn.email({ email, password }, {
      onSuccess: () => {
        router.push("/");
        router.refresh();
        // don't setLoading(false) here — page will unmount
      },
      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F1A] px-4">
      {/* ❌ Remove Card.Header / Card.Content etc — use plain divs */}
      <div className="w-full max-w-sm p-6 bg-[#13131F]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-xs text-white/50 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 py-2 px-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <TextField name="email" type="email">
            <Label className="text-white/70 text-sm font-medium mb-1">Email</Label>
            <Input
              placeholder="you@example.com"
              variant="bordered"  // ✅ valid HeroUI v3 variant
              className="bg-[#1A1A2E] border-white/10 text-white placeholder:text-white/30"
            />
          </TextField>

          <TextField name="password" type="password">
            <div className="flex justify-between items-center mb-1">
              <Label className="text-white/70 text-sm font-medium">Password</Label>
              <a href="/forgot-password" className="text-xs text-[#7C5CBF] hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              placeholder="Your password"
              variant="bordered"  // ✅
              className="bg-[#1A1A2E] border-white/10 text-white placeholder:text-white/30"
            />
          </TextField>

          <Button            type="submit"
            isLoading={loading}
            isDisabled={loading}
            className="w-full bg-[#7C5CBF] hover:bg-[#6A4CA3] text-white font-semibold py-2 rounded-xl mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-white/50">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#7C5CBF] hover:underline font-medium">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}