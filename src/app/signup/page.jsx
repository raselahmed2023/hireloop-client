"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, Separator } from "@heroui/react";
import { Person, Envelope, Lock } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const { error } = await authClient.signUp.email(form);
    if (error) setError(error.message);
    else router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F1A] px-4">
      <Card className="w-full max-w-sm p-6 bg-[#13131F] border border-white/10">
        <Card.Header className="flex flex-col items-center pb-4">
          <h1 className="text-xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-white/40">Sign up to get started</p>
        </Card.Header>

        <Separator />

        <Card.Content className="flex flex-col gap-4 pt-5">
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <Input
            label="Name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange("name")}
            startContent={<Person width={16} height={16} />}
          />

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
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={handleChange("password")}
            startContent={<Lock width={16} height={16} />}
          />

          <Button
            onPress={handleSubmit}
            isLoading={loading}
            className="w-full bg-[#7C5CBF] text-white font-semibold"
          >
            Sign Up
          </Button>

          <p className="text-center text-sm text-white/40">
            Already have an account?{" "}
            <a href="/login" className="text-[#7C5CBF]">Sign in</a>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}