'use client';

import Link from 'next/link';
import { useState } from 'react';
import { missions } from '@/lib/data';
import type { Difficulty } from '@/lib/types';

const difficulties: ('All' | Difficulty)[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const categories = ['All', ...Array.from(new Set(missions.map((m) => m.category)))];

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const styles: Record<Difficulty, string> = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}

export default function MissionsPage() {
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<'All' | Difficulty>('All');
  const [catFilter, setCatFilter] = useState('All');

  const filtered = missions.filter((m) => {
    const matchSearch =
      search === '' ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.tools.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchDiff = diffFilter === 'All' || m.difficulty === diffFilter;
    const matchCat = catFilter === 'All' || m.category === catFilter;
    return matchSearch && matchDiff && matchCat;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-green)] mb-2">Hands-On Projects</p>
        <h1 className="text-4xl font-extrabold text-white">Missions</h1>
        <p className="mt-3 text-slate-500 max-w-2xl">
          Each mission is a scoped, real-world security project. Complete them to build skills, earn portfolio artefacts, and prepare for interviews.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-10">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search missions or tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-[var(--color-green)] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                diffFilter === d
                  ? 'bg-[var(--color-green)] text-[var(--color-base)]'
                  : 'border border-[var(--color-border)] text-slate-400 hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                catFilter === c
                  ? 'bg-[var(--color-blue)]/20 text-[var(--color-blue)] border border-[var(--color-blue)]/30'
                  : 'border border-[var(--color-border)] text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <p className="text-4xl mb-3">🔍</p>
          <p>No missions match your filters.</p>
          <button onClick={() => { setSearch(''); setDiffFilter('All'); setCatFilter('All'); }} className="mt-3 text-sm text-[var(--color-green)] hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((mission) => (
            <Link
              key={mission.slug}
              href={`/missions/${mission.slug}`}
              className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-green)]/40 card-glow transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <DifficultyBadge difficulty={mission.difficulty} />
                <span className="text-xs text-slate-600">{mission.duration}</span>
              </div>
              <h2 className="text-lg font-semibold text-white group-hover:text-[var(--color-green)] transition-colors">{mission.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 flex-1">{mission.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {mission.tools.slice(0, 4).map((tool) => (
                  <span key={tool} className="rounded-md bg-[var(--color-elevated)] px-2 py-0.5 text-xs font-mono text-slate-400">{tool}</span>
                ))}
                {mission.tools.length > 4 && (
                  <span className="rounded-md bg-[var(--color-elevated)] px-2 py-0.5 text-xs font-mono text-slate-600">+{mission.tools.length - 4}</span>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-slate-600">{mission.category}</span>
                <span className="text-sm font-medium text-[var(--color-green)] flex items-center gap-1">
                  Start Mission
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
