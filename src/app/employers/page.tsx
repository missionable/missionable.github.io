import type { Metadata } from "next";
import { EmployerForm } from "./employer-form";

export const metadata: Metadata = {
  title: "Hire Talent — MissionAble Systems",
  description:
    "Connect with skilled, mission-ready tech professionals through MissionAble Systems.",
};

export default function EmployersPage() {
  return (
    <>
      <section className="bg-navy-950 pb-12 pt-16 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hire Mission-Ready Talent
          </h1>
          <p className="mt-4 text-slate-300">
            Tell us about the role you&apos;re looking to fill and our team will
            connect you with qualified professionals from the MissionAble
            network.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6">
          <EmployerForm />
        </div>
      </section>
    </>
  );
}
