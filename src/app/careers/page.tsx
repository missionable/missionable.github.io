import Link from 'next/link';
import { careerPaths, missions } from '@/lib/data';

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-purple)] mb-2">Know Your Destination</p>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Career Paths</h1>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
          Three high-demand cybersecurity roles — each with a clear learning order, required skills, and the missions that will get you there.
        </p>
      </div>

      <div className="space-y-10">
        {careerPaths.map((path) => {
          const relatedMissions = missions.filter((m) => path.missionSlugs.includes(m.slug));
          return (
            <div
              key={path.id}
              id={path.id}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
            >
              {/* Header */}
              <div className="border-b border-[var(--color-border)] bg-[var(--color-elevated)] px-6 py-6 sm:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-2xl">
                      {path.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{path.title}</h2>
                      <p className="text-sm text-slate-500 mt-0.5">{path.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-[var(--color-green)]">{path.avgSalary}</div>
                    <div className="text-xs text-slate-600">avg. UK salary</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
                {/* Skills */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Required Skills</h3>
                  <ul className="space-y-2">
                    {path.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="h-3.5 w-3.5 text-[var(--color-green)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learning Order */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">What to Learn First</h3>
                  <ol className="space-y-3">
                    {path.learningOrder.map((step, i) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-elevated)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-green)]">
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-400">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Recommended Missions */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Recommended Missions</h3>
                  <div className="space-y-3">
                    {relatedMissions.map((mission) => (
                      <Link
                        key={mission.slug}
                        href={`/missions/${mission.slug}`}
                        className="group flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-2.5 hover:border-[var(--color-green)]/40 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate group-hover:text-[var(--color-green)] transition-colors">{mission.title}</div>
                          <div className="text-xs text-slate-600 mt-0.5">{mission.difficulty} · {mission.duration}</div>
                        </div>
                        <svg className="h-4 w-4 text-slate-600 group-hover:text-[var(--color-green)] shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Job market CTA */}
      <div className="mt-16 rounded-2xl border border-[var(--color-green)]/20 bg-[var(--color-green)]/5 px-8 py-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Not sure which path to take?</h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-6">
          Start with the Linux Hardening mission — it builds fundamentals that are relevant to all three career paths. Then explore from there.
        </p>
        <Link
          href="/missions/linux-hardening-fundamentals"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-green)] px-6 py-3 text-sm font-semibold text-[var(--color-base)] hover:bg-[var(--color-green-dim)] transition-colors"
        >
          Start with Linux Hardening
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
