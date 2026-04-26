import Link from 'next/link';

const useCases = [
  {
    icon: '🕵️',
    title: 'Threat Detection & Anomaly Analysis',
    color: 'var(--color-green)',
    description: 'Machine learning models can analyse millions of log events per second and surface anomalies that human analysts would miss — unusual login times, rare process executions, lateral movement patterns.',
    examples: [
      'User Behaviour Analytics (UBA) detecting compromised credentials',
      'Network flow analysis spotting data exfiltration',
      'Malware classification using file hash feature vectors',
    ],
    tools: ['Elasticsearch ML', 'Splunk UEBA', 'Darktrace', 'Custom sklearn models'],
  },
  {
    icon: '⚡',
    title: 'Security Automation & SOAR',
    color: 'var(--color-blue)',
    description: 'AI-driven Security Orchestration, Automation, and Response (SOAR) platforms can triage, enrich, and respond to alerts automatically — dramatically reducing mean time to respond (MTTR).',
    examples: [
      'Auto-enriching alerts with VirusTotal, Shodan lookups',
      'Blocking malicious IPs across firewall rules automatically',
      'Generating incident tickets with context from log data',
    ],
    tools: ['Splunk SOAR', 'Palo Alto XSOAR', 'LangChain + Python', 'n8n'],
  },
  {
    icon: '🔄',
    title: 'DevSecOps Workflows',
    color: 'var(--color-purple)',
    description: 'LLMs and AI-assisted tools are transforming how security is embedded in code. From auto-fixing vulnerabilities to writing security policies from infrastructure code.',
    examples: [
      'AI-assisted SAST tools suggesting code-level fixes (GitHub Copilot)',
      'LLM-generated IaC security policies from plain English',
      'Automated triage of SAST findings to reduce noise',
    ],
    tools: ['GitHub Advanced Security', 'Semgrep (AI rules)', 'Snyk', 'CodeQL'],
  },
  {
    icon: '🤖',
    title: 'LLM Security — New Attack Surface',
    color: 'var(--color-orange)',
    description: 'As organisations deploy LLMs, a new attack surface opens up. Prompt injection, data exfiltration via LLM context, and model poisoning are emerging threats that security engineers must understand.',
    examples: [
      'Prompt injection attacks on LLM-powered assistants',
      'Indirect injection via malicious web content',
      'OWASP Top 10 for LLM Applications',
    ],
    tools: ['OWASP LLM Top 10', 'PyRIT (red teaming)', 'PromptBench', 'LangSmith'],
  },
];

const aiLearningPath = [
  { step: 1, title: 'Python for Security Automation', desc: 'Write scripts to parse logs, call APIs, and automate repetitive tasks.' },
  { step: 2, title: 'ML Fundamentals', desc: 'Classification, clustering, anomaly detection. scikit-learn + pandas.' },
  { step: 3, title: 'Log Analysis at Scale', desc: 'Elasticsearch, OpenSearch — index and query millions of log events.' },
  { step: 4, title: 'SIEM ML Features', desc: 'Enable and tune ML features in Splunk or Elastic SIEM. Build detection rules.' },
  { step: 5, title: 'LLM Security', desc: 'Study OWASP LLM Top 10. Run red-team exercises against LLM-powered apps.' },
  { step: 6, title: 'Build a Pipeline', desc: 'Complete the Automated Threat Detection mission to apply everything end-to-end.' },
];

export default function AISecurityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-orange)] mb-2">The Future of the Field</p>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">AI in Cybersecurity</h1>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
          AI is transforming every layer of the security stack. Understand where it helps, where it introduces new risks, and how to build skills that stay relevant.
        </p>
      </div>

      {/* Key message */}
      <div className="rounded-xl border border-[var(--color-orange)]/20 bg-[var(--color-orange)]/5 px-6 py-5 mb-14 flex gap-4">
        <span className="text-2xl shrink-0">⚠️</span>
        <div>
          <h2 className="font-semibold text-white mb-1">AI amplifies both attackers and defenders</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Attackers use AI to automate phishing, generate malware variants, and find vulnerabilities faster. Defenders use it to analyse threats at scale and respond automatically. The security engineers who thrive will be those who can harness AI — not just those who understand legacy tools.
          </p>
        </div>
      </div>

      {/* Use cases */}
      <div className="grid gap-8 md:grid-cols-2">
        {useCases.map((uc) => (
          <div key={uc.title} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">{uc.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-white">{uc.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">{uc.description}</p>

            <div className="mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">Real-world examples</h4>
              <ul className="space-y-2">
                {uc.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: uc.color }} />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tools</h4>
              <div className="flex flex-wrap gap-1.5">
                {uc.tools.map((tool) => (
                  <span key={tool} className="rounded-md bg-[var(--color-elevated)] px-2 py-0.5 text-xs font-mono text-slate-400">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Path */}
      <div className="mt-20">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">AI + Security Learning Path</h2>
          <p className="mt-2 text-slate-500">A practical sequence for adding AI skills to your cybersecurity toolkit.</p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-[var(--color-border)] md:left-6" />
          <div className="space-y-6">
            {aiLearningPath.map((item) => (
              <div key={item.step} className="relative flex gap-6 pl-12 md:pl-16">
                <div className="absolute left-0 flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-bold text-[var(--color-green)]">
                  {item.step}
                </div>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex-1 hover:border-[var(--color-green)]/30 transition-colors">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-slate-500 mb-6">Ready to build a real AI-powered detection pipeline?</p>
        <Link
          href="/missions/automated-threat-detection-pipeline"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-green)] px-6 py-3 text-sm font-semibold text-[var(--color-base)] hover:bg-[var(--color-green-dim)] transition-colors"
        >
          Start the Threat Detection Mission
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
