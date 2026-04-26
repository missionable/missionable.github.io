import { roadmapCategories } from '@/lib/data';
import type { RoadmapCategory } from '@/lib/types';

const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;

const levelStyles = {
  Beginner: { label: 'Beginner', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  Intermediate: { label: 'Intermediate', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', dot: 'bg-orange-400' },
  Advanced: { label: 'Advanced', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', dot: 'bg-red-400' },
};

function CategoryCard({ cat, level }: { cat: RoadmapCategory; level: typeof levels[number] }) {
  const topics = cat[level.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'];
  const style = levelStyles[level];
  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} p-5`}>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li key={topic} className="flex items-start gap-2 text-sm">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${style.dot}`} />
            <span className="text-slate-300">{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-blue)] mb-2">Your Learning Path</p>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Skill Roadmap</h1>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
          A structured, opinionated path from zero to job-ready. Follow this roadmap to build real-world cybersecurity skills in the right order.
        </p>
      </div>

      {/* Level legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
        {levels.map((level) => {
          const s = levelStyles[level];
          return (
            <div key={level} className={`flex items-center gap-2 rounded-full border ${s.border} ${s.bg} px-4 py-1.5`}>
              <span className={`h-2 w-2 rounded-full ${s.dot}`} />
              <span className={`text-sm font-medium ${s.text}`}>{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Category headers */}
      <div className="grid grid-cols-3 gap-3 mb-3 pl-[220px]">
        {levels.map((level) => (
          <div key={level} className={`text-center text-sm font-semibold ${levelStyles[level].text}`}>
            {level}
          </div>
        ))}
      </div>

      {/* Roadmap grid — desktop */}
      <div className="hidden md:block space-y-4">
        {roadmapCategories.map((cat) => (
          <div key={cat.id} className="flex items-start gap-4">
            {/* Category label */}
            <div className="w-[200px] shrink-0 flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <div className="font-semibold text-white text-sm">{cat.title}</div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-3">
              {levels.map((level) => (
                <CategoryCard key={level} cat={cat} level={level} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap — mobile (vertical per category) */}
      <div className="md:hidden space-y-8">
        {roadmapCategories.map((cat) => (
          <div key={cat.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)]">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="font-semibold text-white">{cat.title}</h3>
            </div>
            <div className="p-4 space-y-4">
              {levels.map((level) => (
                <div key={level}>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${levelStyles[level].text}`}>{level}</div>
                  <CategoryCard cat={cat} level={level} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Learning tips */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          {
            icon: '📌',
            title: 'Start with Linux',
            tip: 'Every cybersecurity domain builds on Linux fundamentals. Spend at least 2 weeks getting comfortable on the command line before moving on.',
          },
          {
            icon: '🔄',
            title: 'Learn by Doing',
            tip: 'Don\'t just read about tools — use them. Set up a lab environment (VirtualBox/Kali) and practice every concept with a real mission.',
          },
          {
            icon: '🗂️',
            title: 'Document Everything',
            tip: 'Keep a write-up for every mission you complete. Your documentation becomes your portfolio. Future employers love seeing your thinking.',
          },
        ].map((tip) => (
          <div key={tip.title} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="text-2xl mb-3">{tip.icon}</div>
            <h3 className="font-semibold text-white mb-2">{tip.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{tip.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
