import Link from 'next/link';
import { notFound } from 'next/navigation';
import { missions } from '@/lib/data';
import type { Difficulty } from '@/lib/types';

export function generateStaticParams() {
  return missions.map((m) => ({ slug: m.slug }));
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const styles: Record<Difficulty, string> = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-medium ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}

export default async function MissionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = missions.find((m) => m.slug === slug);
  if (!mission) notFound();

  const others = missions.filter((m) => m.slug !== mission.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/missions" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[var(--color-green)] transition-colors mb-8">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Missions
      </Link>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <DifficultyBadge difficulty={mission.difficulty} />
              <span className="text-sm text-slate-500">{mission.category}</span>
              <span className="text-sm text-slate-500">·</span>
              <span className="text-sm text-slate-500">{mission.duration}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white">{mission.title}</h1>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">{mission.description}</p>
          </div>

          {/* Overview */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[var(--color-green)]">01</span> Overview
            </h2>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <p className="text-slate-400 leading-relaxed">{mission.overview}</p>
            </div>
          </section>

          {/* Tasks */}
          <section id="tasks">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[var(--color-green)]">02</span> Mission Tasks
            </h2>
            <div className="space-y-4">
              {mission.tasks.map((task, i) => (
                <div
                  key={task.id}
                  className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-green)]/30 transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-green)]/10 border border-[var(--color-green)]/20 text-sm font-bold text-[var(--color-green)]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{task.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Job Relevance */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[var(--color-green)]">04</span> Why This Matters
            </h2>
            <div className="rounded-xl border border-[var(--color-green)]/20 bg-[var(--color-green)]/5 p-6">
              <p className="text-slate-300 leading-relaxed">{mission.jobRelevance}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* CTA Card */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sticky top-24">
            <h3 className="font-semibold text-white mb-4">Ready to start?</h3>
            <a href="#tasks" className="block w-full rounded-lg bg-[var(--color-green)] py-3 text-sm font-semibold text-[var(--color-base)] hover:bg-[var(--color-green-dim)] transition-colors mb-3 text-center">
              Start Mission
            </a>
            <p className="text-xs text-slate-600 text-center">Free forever. No account required.</p>

            {/* Tech Stack */}
            <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Tools & Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {mission.tools.map((tool) => (
                  <span key={tool} className="rounded-md bg-[var(--color-elevated)] px-2.5 py-1 text-xs font-mono text-slate-300">{tool}</span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Skills You&apos;ll Gain</h4>
              <ul className="space-y-2">
                {mission.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-slate-400">
                    <svg className="h-3.5 w-3.5 text-[var(--color-green)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Other Missions */}
      {others.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">More Missions</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((m) => (
              <Link
                key={m.slug}
                href={`/missions/${m.slug}`}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-green)]/40 card-glow transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <DifficultyBadge difficulty={m.difficulty} />
                  <span className="text-xs text-slate-600">{m.duration}</span>
                </div>
                <h3 className="font-semibold text-white group-hover:text-[var(--color-green)] transition-colors">{m.title}</h3>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">{m.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
