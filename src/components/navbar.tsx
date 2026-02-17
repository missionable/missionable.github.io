"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-navy-950 text-white" role="banner">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-xl font-bold tracking-tight">
          Mission<span className="text-navy-300">Able</span> Systems
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              href="/join"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Join Talent Network
            </Link>
          </li>
          <li>
            <Link
              href="/employers"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Hire Talent
            </Link>
          </li>
          <li>
            <Link
              href="/admin/login"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="border-t border-navy-800 px-6 pb-4 md:hidden"
        >
          <li>
            <Link
              href="/join"
              className="block py-2 text-sm text-slate-300 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Join Talent Network
            </Link>
          </li>
          <li>
            <Link
              href="/employers"
              className="block py-2 text-sm text-slate-300 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Hire Talent
            </Link>
          </li>
          <li>
            <Link
              href="/admin/login"
              className="block py-2 text-sm text-slate-400 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
