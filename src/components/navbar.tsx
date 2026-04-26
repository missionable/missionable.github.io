'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/missions', label: 'Missions' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/careers', label: 'Careers' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/ai-security', label: 'AI & Security' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-base)]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-green)]/10 border border-[var(--color-green)]/30 group-hover:bg-[var(--color-green)]/20 transition-colors">
            <span className="text-sm font-bold text-[var(--color-green)]">M</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Mission<span className="text-[var(--color-green)]">able</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[var(--color-green)]/10 text-[var(--color-green)]'
                      : 'text-slate-400 hover:text-white hover:bg-[var(--color-surface)]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/missions"
            className="rounded-lg bg-[var(--color-green)] px-4 py-2 text-sm font-semibold text-[var(--color-base)] hover:bg-[var(--color-green-dim)] transition-colors"
          >
            Start Learning
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[var(--color-green)]/10 text-[var(--color-green)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2">
              <Link
                href="/missions"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-[var(--color-green)] px-4 py-2 text-sm font-semibold text-[var(--color-base)] text-center"
              >
                Start Learning
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
