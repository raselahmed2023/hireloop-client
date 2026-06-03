"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Product: [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/worker-ai" },
    { label: "Companies", href: "/companies" },
    { label: "Salary data", href: "/salary" },
  ],
  Navigations: [
    { label: "Help center", href: "/help" },
    { label: "Career library", href: "/career-library" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "/brand" },
    { label: "Newsroom", href: "/newsroom" },
  ],
};

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.566 0-2.387-1.715-4.057-4.163-4.057-2.837 0-4.5 2.128-4.5 4.327 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0e0f13] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Top section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between">

          {/* Left — Logo + tagline */}
          <div className="max-w-[220px]">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="HireLoop"
                width={120}
                height={32}
                priority
              />
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Right — Link columns */}
          <div className="flex flex-wrap gap-10 md:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-indigo-400 mb-4">{category}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Bottom right */}
          <div className="flex items-center gap-1 text-xs text-gray-600 flex-wrap justify-center">
            <span>Copyright 2024 – Hireloop</span>
            <span className="mx-1">·</span>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms & Policy</Link>
            <span>-</span>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Guideline</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}