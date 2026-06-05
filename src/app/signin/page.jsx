"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, Separator } from "@heroui/react";
import { Envelope, Lock } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const { error } = await authClient.signIn.email(form);
    if (error) setError(error.message);
    else router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F1A] px-4">
      <Card className="w-full max-w-sm p-6 bg-[#13131F] border border-white/10">
        <Card.Header className="flex flex-col items-center pb-4">
          <h1 className="text-xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-white/40">Sign in to your account</p>
        </Card.Header>

        <Separator />

        <Card.Content className="flex flex-col gap-4 pt-5">
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange("email")}
            startContent={<Envelope width={16} height={16} />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange("password")}
            startContent={<Lock width={16} height={16} />}
          />

          <div className="text-right -mt-2">
            <a href="/forgot-password" className="text-sm text-[#7C5CBF]">
              Forgot password?
            </a>
          </div>

          <Button
            onPress={handleSubmit}
            isLoading={loading}
            className="w-full bg-[#7C5CBF] text-white font-semibold"
          >
            Sign In
          </Button>

          <p className="text-center text-sm text-white/40">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#7C5CBF]">Sign up</a>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}