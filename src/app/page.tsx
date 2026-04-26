import Link from 'next/link';
import { missions } from '@/lib/data';

const valueProps = [
  {
    icon: '🎯',
    title: 'Real-World Missions',
    description: 'No toy examples. Every project mirrors an actual task you\'d encounter on the job — from hardening servers to securing CI/CD pipelines.',
  },
  {
    icon: '🗂️',
    title: 'Portfolio-Ready Output',
    description: 'Each mission produces tangible deliverables you can push to GitHub and reference in interviews with confidence.',
  },
  {
    icon: '🗺️',
    title: 'Clear Career Path',
    description: 'Know exactly what to learn and in what order. Follow a structured roadmap from Linux fundamentals to DevSecOps.',
  },
];

const stats = [
  { value: '5', label: 'Core Missions' },
  { value: '3', label: 'Career Paths' },
  { value: '6', label: 'Skill Domains' },
  { value: '100%', label: 'Hands-On' },
];

export default function HomePage() {
  const featuredMissions = missions.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-base)] via-transparent to-[var(--color-base)] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-green)]/30 bg-[var(--color-green)]/5 px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
              <span className="text-xs font-medium text-[var(--color-green)]">Now live — 5 missions available</span>
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Become Job-Ready in{' '}
              <span className="gradient-text">Cybersecurity</span>
              <br />
              Through Real Missions
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              Missionable is the hands-on learning platform that takes you from zero to hired — by building real security projects, following a structured skill roadmap, and working with the tools employers actually use.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/missions"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-green)] px-8 py-3.5 text-sm font-semibold text-[var(--color-base)] hover:bg-[var(--color-green-dim)] transition-colors animate-pulse-glow"
              >
                Start Your First Mission
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-bright)] px-8 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              >
                View Skill Roadmap
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-extrabold text-white">{s.value}</div>
                  <div className="mt-1 text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {valueProps.map((v) => (
              <div key={v.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] text-xl border border-[var(--color-border)]">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Missions */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-green)] mb-2">Hands-On Projects</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Featured Missions</h2>
              <p className="mt-3 text-slate-500 max-w-xl">Start with one of these real-world security projects. Each mission is scoped to take 4–14 hours and produces a portfolio artefact.</p>
            </div>
            <Link
              href="/missions"
              className="shrink-0 text-sm font-medium text-[var(--color-green)] hover:text-[var(--color-green-dim)] flex items-center gap-1 transition-colors"
            >
              View all missions
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredMissions.map((mission) => (
              <MissionCard key={mission.slug} mission={mission} />
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Preview */}
      <section className="py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-purple)] mb-2">Where You&apos;re Going</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Clear Career Paths</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">Know your destination before you start. Each career path shows you exactly what to learn and in what order.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: '🔍', title: 'SOC Analyst', salary: '£35k–£55k', tags: ['SIEM', 'Threat Detection', 'Log Analysis'], href: '/careers#soc-analyst' },
              { icon: '☁️', title: 'Cloud Security Engineer', salary: '£65k–£95k', tags: ['AWS', 'IAM', 'Terraform'], href: '/careers#cloud-security-engineer' },
              { icon: '⚙️', title: 'DevSecOps Engineer', salary: '£70k–£110k', tags: ['CI/CD', 'SAST', 'Containers'], href: '/careers#devsecops-engineer' },
            ].map((path) => (
              <Link key={path.title} href={path.href} className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] p-6 hover:border-[var(--color-green)]/40 card-glow transition-all duration-300">
                <div className="text-2xl mb-3">{path.icon}</div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[var(--color-green)] transition-colors">{path.title}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--color-green)]">{path.salary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {path.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-[var(--color-border)] px-2 py-0.5 text-xs text-slate-400">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/careers" className="text-sm text-slate-400 hover:text-[var(--color-green)] transition-colors">
              Explore all career paths →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-green)]/5 via-transparent to-[var(--color-blue)]/5 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Ready to start your first mission?</h2>
          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            No sign-up required. Pick a mission, follow the steps, and build something real.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/missions"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-green)] px-8 py-3.5 text-sm font-semibold text-[var(--color-base)] hover:bg-[var(--color-green-dim)] transition-colors"
            >
              Browse All Missions
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-bright)] px-8 py-3.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              View Roadmap
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const styles: Record<string, string> = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${styles[difficulty] ?? styles.Beginner}`}>
      {difficulty}
    </span>
  );
}

function MissionCard({ mission }: { mission: (typeof missions)[number] }) {
  return (
    <Link
      href={`/missions/${mission.slug}`}
      className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-green)]/40 card-glow transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <DifficultyBadge difficulty={mission.difficulty} />
        <span className="text-xs text-slate-600">{mission.duration}</span>
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-[var(--color-green)] transition-colors">{mission.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 flex-1">{mission.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {mission.tools.slice(0, 4).map((tool) => (
          <span key={tool} className="rounded-md bg-[var(--color-elevated)] px-2 py-0.5 text-xs text-slate-400 font-mono">{tool}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-[var(--color-green)]">
        Start Mission
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
