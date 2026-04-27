'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/lib/types';

export function TaskList({ tasks, slug }: { tasks: Task[]; slug: string }) {
  const storageKey = `mission-${slug}-tasks`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setChecked(JSON.parse(stored));
  }, [storageKey]);

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = tasks.filter((t) => checked[t.id]).length;
  const percent = Math.round((completedCount / tasks.length) * 100);
  const allDone = completedCount === tasks.length;

  return (
    <div>
      {/* Progress */}
      <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">
            {completedCount} of {tasks.length} tasks complete
          </span>
          {allDone ? (
            <span className="text-sm font-semibold text-[var(--color-green)]">Mission complete! 🎉</span>
          ) : (
            <span className="text-sm font-medium text-[var(--color-green)]">{percent}%</span>
          )}
        </div>
        <div className="h-2 rounded-full bg-[var(--color-elevated)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--color-green)] transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task, i) => {
          const isChecked = !!checked[task.id];
          const isExpanded = !!expanded[task.id];
          const hasExtra = !!(task.hint || (task.resources && task.resources.length > 0));

          return (
            <div
              key={task.id}
              className={`rounded-xl border transition-all duration-200 ${
                isChecked
                  ? 'border-[var(--color-green)]/30 bg-[var(--color-green)]/5'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
            >
              <div className="flex items-start gap-4 p-5">
                {/* Checkbox */}
                <button
                  onClick={() => toggle(task.id)}
                  aria-label={isChecked ? 'Mark incomplete' : 'Mark complete'}
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                    isChecked
                      ? 'border-[var(--color-green)] bg-[var(--color-green)]'
                      : 'border-slate-600 hover:border-[var(--color-green)]'
                  }`}
                >
                  {isChecked && (
                    <svg className="h-3.5 w-3.5 text-[var(--color-base)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-[var(--color-green)] mr-2">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-semibold ${isChecked ? 'line-through text-slate-500' : 'text-white'}`}>
                        {task.title}
                      </span>
                    </div>
                    {hasExtra && (
                      <button
                        onClick={() => toggleExpand(task.id)}
                        className="shrink-0 text-xs text-slate-500 hover:text-[var(--color-green)] transition-colors flex items-center gap-1"
                      >
                        {isExpanded ? 'Less' : 'Hint & Resources'}
                        <svg
                          className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{task.description}</p>
                </div>
              </div>

              {/* Expandable hint + resources */}
              {hasExtra && isExpanded && (
                <div className="border-t border-[var(--color-border)] px-5 pb-5 pt-4 space-y-4">
                  {task.hint && (
                    <div className="rounded-lg border border-[var(--color-blue)]/20 bg-[var(--color-blue)]/5 p-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-xs font-semibold text-[var(--color-blue)]">💡 Hint</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-mono">{task.hint}</p>
                    </div>
                  )}
                  {task.resources && task.resources.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Resources</p>
                      <ul className="space-y-1.5">
                        {task.resources.map((r) => (
                          <li key={r.url}>
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-green)] hover:text-[var(--color-green-dim)] transition-colors"
                            >
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              {r.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
