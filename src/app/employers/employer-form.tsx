"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { TECH_STACK_OPTIONS } from "@/lib/constants";

export function EmployerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const companyName = formData.get("companyName") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const roleDescription = formData.get("roleDescription") as string;

    if (selectedSkills.length === 0) {
      setError("Please select at least one required skill.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("employer_inquiries")
      .insert({
        company_name: companyName,
        contact_email: contactEmail,
        role_description: roleDescription,
        required_skills: selectedSkills,
      });

    if (insertError) {
      setError(`Submission failed: ${insertError.message}`);
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl border border-green-200 bg-green-50 p-10 text-center"
        role="status"
      >
        <h2 className="text-2xl font-bold text-green-900">Inquiry Received</h2>
        <p className="mt-3 text-green-700">
          Thank you for your interest. Our team will review your requirements
          and get back to you with qualified candidates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Company Name */}
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-slate-700"
        >
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
          placeholder="Acme Corp"
        />
      </div>

      {/* Contact Email */}
      <div>
        <label
          htmlFor="contactEmail"
          className="block text-sm font-medium text-slate-700"
        >
          Contact Email <span className="text-red-500">*</span>
        </label>
        <input
          id="contactEmail"
          name="contactEmail"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
          placeholder="hiring@acme.com"
        />
      </div>

      {/* Role Description */}
      <div>
        <label
          htmlFor="roleDescription"
          className="block text-sm font-medium text-slate-700"
        >
          Role Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="roleDescription"
          name="roleDescription"
          required
          rows={5}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
          placeholder="Describe the role, responsibilities, and any relevant details (clearance requirements, project type, etc.)"
        />
      </div>

      {/* Required Skills */}
      <fieldset>
        <legend className="block text-sm font-medium text-slate-700">
          Required Skills <span className="text-red-500">*</span>
        </legend>
        <p className="mt-1 text-xs text-slate-400">
          Select all that apply.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TECH_STACK_OPTIONS.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                aria-pressed={isSelected}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  isSelected
                    ? "border-navy-600 bg-navy-600 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-navy-400 hover:text-navy-700"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-navy-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
