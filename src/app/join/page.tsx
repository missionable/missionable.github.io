import type { Metadata } from "next";
import { TalentForm } from "./talent-form";

export const metadata: Metadata = {
  title: "Join the Talent Network — MissionAble Systems",
  description:
    "Sign up to join the MissionAble talent network. Showcase your skills and connect with employers seeking exceptional tech professionals.",
};

export default function JoinPage() {
  return (
    <>
      <section className="bg-navy-950 pb-12 pt-16 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join the Talent Network
          </h1>
          <p className="mt-4 text-slate-300">
            Create your profile to get matched with employers and federal
            contractors seeking mission-ready tech talent.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6">
          <TalentForm />
        </div>
      </section>
    </>
  );
}
