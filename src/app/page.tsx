import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 pb-24 pt-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Tech Talent.{" "}
            <span className="text-navy-300">Mission Ready.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            MissionAble Systems connects skilled tech professionals with
            disabilities to employers and federal contractors seeking
            exceptional, cleared-ready talent.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/join"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-navy-950 shadow-lg transition hover:bg-slate-100"
            >
              Join the Talent Network
            </Link>
            <Link
              href="/employers"
              className="inline-flex items-center rounded-lg border-2 border-navy-400 px-8 py-3.5 text-sm font-semibold text-navy-300 transition hover:bg-navy-900"
            >
              Hire Talent
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="how-it-works-heading"
            className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
            A streamlined process that puts talent and employers on a direct
            path to mission-critical outcomes.
          </p>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <StepCard
              step="01"
              title="Create Your Profile"
              description="Tech professionals sign up, showcase their skills, and upload a resume. Optional accommodation preferences keep things confidential."
            />
            <StepCard
              step="02"
              title="Get Matched"
              description="Our team reviews profiles and connects qualified candidates with employers actively seeking skilled, mission-ready talent."
            />
            <StepCard
              step="03"
              title="Start Your Mission"
              description="Employers engage directly with vetted professionals. Onboarding support ensures a smooth transition to your new role."
            />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-navy-50 py-24" aria-labelledby="why-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="why-heading"
            className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Why MissionAble
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <ValueCard
              title="Proven Talent"
              description="Every professional in our network brings verified technical skills and real-world experience to the table."
            />
            <ValueCard
              title="Clearance Ready"
              description="We identify candidates eligible for security clearances, reducing onboarding time for federal contracts."
            />
            <ValueCard
              title="Section 503 & OFCCP"
              description="Hiring through MissionAble helps federal contractors meet disability inclusion requirements and compliance goals."
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-navy-900 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-slate-300">
            Whether you&apos;re a professional looking for your next mission or
            an employer seeking top-tier talent, MissionAble is your platform.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/join"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-navy-950 transition hover:bg-slate-100"
            >
              Join the Talent Network
            </Link>
            <Link
              href="/employers"
              className="inline-flex items-center rounded-lg border-2 border-navy-400 px-8 py-3.5 text-sm font-semibold text-navy-300 transition hover:bg-navy-800"
            >
              Hire Talent
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-lg font-bold text-white">
        {step}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}
