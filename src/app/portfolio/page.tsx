const cvBullets = [
  'Hardened Ubuntu 22.04 server: configured UFW, SSH key-only access, fail2ban, and auditd — reduced attack surface by removing 12 unused services',
  'Conducted AWS security audit using Prowler (CIS benchmark): identified and remediated 3 critical misconfigurations including public S3 buckets and wildcard IAM policies',
  'Built automated threat detection pipeline with ELK Stack and Python: ingested 50k+ log events/hour, wrote Sigma rules detecting brute-force and port-scan patterns',
  'Integrated security into CI/CD pipeline (GitHub Actions): added Semgrep, Trivy, and tfsec — security gates block merges on CRITICAL findings',
  'Containerised web application using Docker with security hardening: distroless base image, read-only filesystem, dropped Linux capabilities, non-root user',
];

const githubStructure = [
  { name: 'README.md', type: 'file', desc: 'Project overview, what you built, tools used' },
  { name: 'docs/', type: 'folder', desc: 'Write-up, screenshots, evidence of findings' },
  { name: 'src/', type: 'folder', desc: 'Scripts, configs, Terraform, Dockerfiles' },
  { name: 'findings/', type: 'folder', desc: 'Vulnerability reports, audit outputs' },
  { name: 'remediation/', type: 'folder', desc: 'Before/after configs, fix documentation' },
];

const writeupSections = [
  { title: 'Mission Overview', content: 'What was the goal? What real-world scenario does this mirror? (2–3 sentences)' },
  { title: 'Environment', content: 'What tools did you use? OS, versions, cloud provider. Reproducibility matters.' },
  { title: 'What I Found', content: 'For audit missions: document each finding with severity, evidence (screenshot/output), and impact.' },
  { title: 'What I Did', content: 'Step-by-step explanation of your approach. Show your reasoning, not just commands.' },
  { title: 'Results', content: 'Before/after. Metrics if possible. What improved? Why does it matter?' },
  { title: 'Key Learnings', content: 'What was non-obvious? What would you do differently? This shows maturity.' },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-purple)] mb-2">Stand Out</p>
        <h1 className="text-4xl font-extrabold text-white">Portfolio Templates</h1>
        <p className="mt-3 text-slate-500 max-w-2xl text-lg">
          Templates, examples, and frameworks for documenting your missions and presenting your work to employers.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-12">
          {/* Mission write-up template */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">Mission Write-Up Template</h2>
            <p className="text-slate-500 mb-6 text-sm">Use this structure for every mission you complete. Consistent write-ups build a professional portfolio.</p>
            <div className="space-y-4">
              {writeupSections.map((s, i) => (
                <div key={s.title} className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--color-purple)]/10 border border-[var(--color-purple)]/20 text-xs font-bold text-[var(--color-purple)]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{s.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{s.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Strong CV bullets */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">Strong CV Bullet Points</h2>
            <p className="text-slate-500 mb-6 text-sm">Copy and adapt these bullet points for your own missions. The formula: action verb + tool/method + quantified result.</p>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
              {cvBullets.map((bullet, i) => (
                <div key={i} className="flex gap-3">
                  <span className="mt-0.5 text-[var(--color-green)] shrink-0 text-sm">▶</span>
                  <p className="text-sm text-slate-300 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-[var(--color-blue)]/20 bg-[var(--color-blue)]/5 px-4 py-3">
              <p className="text-sm text-[var(--color-blue)]">
                <strong>Formula:</strong> Verb + what you did + tool you used + quantified impact or outcome
              </p>
            </div>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* GitHub structure */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-1">GitHub Project Structure</h2>
            <p className="text-sm text-slate-500 mb-5">Organise every mission as its own repo with this structure.</p>
            <div className="rounded-lg bg-[var(--color-elevated)] border border-[var(--color-border)] p-4 font-mono text-xs space-y-2.5">
              <div className="text-[var(--color-green)]">📁 mission-docker-security/</div>
              {githubStructure.map((item) => (
                <div key={item.name} className="group flex items-start gap-2 pl-4">
                  <span className="text-slate-600 shrink-0">{item.type === 'folder' ? '📂' : '📄'}</span>
                  <div>
                    <span className="text-slate-300">{item.name}</span>
                    <p className="text-[10px] text-slate-600 leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-white">README.md essentials</h3>
              {[
                'Clear project title and one-sentence description',
                'Badges: difficulty, tools, time estimate',
                'Screenshot or diagram of what you built',
                'How to reproduce (setup instructions)',
                'Key findings or results',
                'Link to full write-up in /docs',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-[var(--color-green)] shrink-0 mt-0.5">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
              <h3 className="text-sm font-semibold text-white mb-3">Portfolio tips</h3>
              {[
                { tip: 'Pin your security repos on GitHub', icon: '📌' },
                { tip: 'Include a professional README on your profile', icon: '👤' },
                { tip: 'Link missions to job descriptions you\'re targeting', icon: '🎯' },
                { tip: 'Show before/after for every remediation', icon: '🔄' },
              ].map((item) => (
                <div key={item.tip} className="flex items-start gap-2.5 text-xs text-slate-400 mb-2.5">
                  <span>{item.icon}</span>
                  <span>{item.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
