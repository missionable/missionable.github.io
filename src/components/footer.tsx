import Link from 'next/link';

const footerLinks = {
  Platform: [
    { href: '/missions', label: 'Missions' },
    { href: '/roadmap', label: 'Skill Roadmap' },
    { href: '/careers', label: 'Career Paths' },
    { href: '/portfolio', label: 'Portfolio Templates' },
  ],
  'AI & Security': [
    { href: '/ai-security', label: 'AI in Cybersecurity' },
    { href: '/missions#advanced', label: 'Advanced Missions' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-green)]/10 border border-[var(--color-green)]/30">
                <span className="text-sm font-bold text-[var(--color-green)]">M</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Mission<span className="text-[var(--color-green)]">able</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Go from beginner to job-ready in cybersecurity through hands-on, mission-driven projects and clear career paths.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{section}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-[var(--color-green)] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Missionable. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built for the next generation of security professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
