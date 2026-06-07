"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../../public/assets/logo.png'
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;


  const handleSignOut = async () => {
    setIsOpen(false); // add this
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          setTimeout(() => router.refresh(), 100);
        }
      },
    });
  };

  return (
    <nav className="bg-[#0e0f13]/95 mb-10 border-b border-white/5 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="HireLoop"
            width={120}
            height={32}
            priority
          />
        </Link>

        {/* Right side — Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Vertical divider */}
          <div className="w-px h-5 bg-white/15 mx-2" />

          {isPending ? (

            <div className="h-8 w-24 bg-white/5 animate-pulse rounded-lg mx-2" />
          ) : user ? (

            <div className="flex items-center gap-3">
              <span className="text-sm text-white/80 font-medium">Hi, {user.name}</span>
              <Button
                onPress={handleSignOut}
                variant="flat"
                size="sm"
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-lg border border-red-500/10"
              >
                Sign Out
              </Button>
            </div>
          ) : (

            <>
              <Link href="/signin" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors ml-1 shadow-lg shadow-indigo-600/20">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger — Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#13141a] border-t border-white/10 px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10 my-2" />

          {isPending ? (
            <div className="h-8 w-full bg-white/5 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="flex flex-col gap-2 px-3 py-2">
              <span className="text-sm text-white/80 font-medium">Logged in as: {user.name}</span>
              <Button
                onPress={handleSignOut}
                variant="flat"
                className="bg-red-500/10 text-red-400 w-full"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/signin" onClick={() => setIsOpen(false)} className="text-sm font-medium text-indigo-400 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-lg transition-colors text-center shadow-lg shadow-indigo-600/20">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}