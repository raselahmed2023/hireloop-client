"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ফর্ম সাবমিট হ্যান্ডলার (জাভাস্ক্রিপ্ট অ্যাপ্রোচ)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

   
    if (!name || !email || !password) {
      setError("Fill up all the room");
      return;
    }
    if (password.length < 8) {
      setError("Password must be 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        router.push("/signin");
      }
    } catch (err) {
      setError("There is a problem. Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F1A] px-4 selection:bg-[#7C5CBF]/30">
      <Card className="w-full max-w-sm p-6 bg-[#13131F]/90 backdrop-blur-md border border-white/10 shadow-2xl">
        
        <Card.Header className="flex flex-col items-center pb-4 text-center">
          <Card.Title className="text-2xl font-bold text-white tracking-wide">
            Create Account
          </Card.Title>
          <Card.Description className="text-xs text-white/50 mt-1">
            Sign up to get started today
          </Card.Description>
        </Card.Header>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Card.Content className="w-full flex flex-col gap-4">
            
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 py-2 px-3 rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            {/* Name Input */}
            <TextField name="name" type="text">
              <Label className="text-white/70 text-sm font-medium mb-1">Name</Label>
              <Input 
                placeholder="Your name" 
                variant="secondary" 
                className="bg-[#1A1A2E] border-white/10 text-white placeholder:text-white/30"
              />
            </TextField>

            {/* Email Input */}
            <TextField name="email" type="email">
              <Label className="text-white/70 text-sm font-medium mb-1">Email</Label>
              <Input 
                placeholder="you@example.com" 
                variant="secondary" 
                className="bg-[#1A1A2E] border-white/10 text-white placeholder:text-white/30"
              />
            </TextField>

            {/* Password Input */}
            <TextField name="password" type="password">
              <Label className="text-white/70 text-sm font-medium mb-1">Password</Label>
              <Input 
                placeholder="Min. 8 characters" 
                variant="secondary" 
                className="bg-[#1A1A2E] border-white/10 text-white placeholder:text-white/30"
              />
            </TextField>
          </Card.Content>

          <Card.Footer className="mt-2 flex flex-col gap-4 w-full">
            <Button
              type="submit"
              isLoading={loading}
              isDisabled={loading}
              className="w-full bg-[#7C5CBF] hover:bg-[#6A4CA3] text-white font-semibold py-5 rounded-xl transition-all shadow-lg shadow-[#7C5CBF]/20"
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-white/50">
              Already have an account?{" "}
              <a href="/signin" className="text-[#7C5CBF] hover:underline font-medium transition-all">
                Sign in
              </a>
            </p>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}