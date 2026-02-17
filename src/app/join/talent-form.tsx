"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  TECH_STACK_OPTIONS,
  EXPERIENCE_LEVELS,
  WORK_PREFERENCES,
} from "@/lib/constants";

export function TalentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  function toggleTech(tech: string) {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const linkedin = formData.get("linkedin") as string;
    const yearsOfExperience = parseInt(
      formData.get("yearsOfExperience") as string,
      10
    );
    const clearanceEligible = formData.get("clearanceEligible") === "yes";
    const workPreference = formData.get("workPreference") as string;
    const accommodationPreferences = formData.get(
      "accommodationPreferences"
    ) as string;
    const resumeFile = formData.get("resume") as File | null;

    if (selectedTech.length === 0) {
      setError("Please select at least one skill from the tech stack.");
      setLoading(false);
      return;
    }

    let resumePath: string | null = null;

    // Upload resume if provided
    if (resumeFile && resumeFile.size > 0) {
      const fileExt = resumeFile.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, resumeFile);

      if (uploadError) {
        setError(`Resume upload failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      resumePath = fileName;
    }

    // Insert talent profile
    const { error: insertError } = await supabase.from("talents").insert({
      full_name: fullName,
      email,
      linkedin: linkedin || null,
      tech_stack: selectedTech,
      years_of_experience: yearsOfExperience,
      clearance_eligible: clearanceEligible,
      work_preference: workPreference,
      accommodation_preferences: accommodationPreferences || null,
      resume_path: resumePath,
    });

    if (insertError) {
      setError(
        insertError.message.includes("duplicate")
          ? "An account with this email already exists."
          : `Submission failed: ${insertError.message}`
      );
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
        <h2 className="text-2xl font-bold text-green-900">
          Profile Submitted
        </h2>
        <p className="mt-3 text-green-700">
          Thank you for joining the MissionAble talent network. Our team will
          review your profile and reach out when opportunities align with your
          skills.
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

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-slate-700"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
          placeholder="Jane Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
          placeholder="jane@example.com"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label
          htmlFor="linkedin"
          className="block text-sm font-medium text-slate-700"
        >
          LinkedIn Profile
        </label>
        <input
          id="linkedin"
          name="linkedin"
          type="url"
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
          placeholder="https://linkedin.com/in/janedoe"
        />
      </div>

      {/* Tech Stack Multi-Select */}
      <fieldset>
        <legend className="block text-sm font-medium text-slate-700">
          Tech Stack <span className="text-red-500">*</span>
        </legend>
        <p className="mt-1 text-xs text-slate-400">
          Select all that apply.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TECH_STACK_OPTIONS.map((tech) => {
            const isSelected = selectedTech.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                aria-pressed={isSelected}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  isSelected
                    ? "border-navy-600 bg-navy-600 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-navy-400 hover:text-navy-700"
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Years of Experience */}
      <div>
        <label
          htmlFor="yearsOfExperience"
          className="block text-sm font-medium text-slate-700"
        >
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <select
          id="yearsOfExperience"
          name="yearsOfExperience"
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
          defaultValue=""
        >
          <option value="" disabled>
            Select experience level
          </option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clearance Eligibility */}
      <fieldset>
        <legend className="block text-sm font-medium text-slate-700">
          Security Clearance Eligibility <span className="text-red-500">*</span>
        </legend>
        <div className="mt-3 flex gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="clearanceEligible"
              value="yes"
              required
              className="h-4 w-4 border-slate-300 text-navy-600 focus:ring-navy-500"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="clearanceEligible"
              value="no"
              className="h-4 w-4 border-slate-300 text-navy-600 focus:ring-navy-500"
            />
            No
          </label>
        </div>
      </fieldset>

      {/* Work Preference */}
      <fieldset>
        <legend className="block text-sm font-medium text-slate-700">
          Work Preference <span className="text-red-500">*</span>
        </legend>
        <div className="mt-3 flex gap-6">
          {WORK_PREFERENCES.map((pref) => (
            <label
              key={pref}
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <input
                type="radio"
                name="workPreference"
                value={pref}
                required
                className="h-4 w-4 border-slate-300 text-navy-600 focus:ring-navy-500"
              />
              {pref}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Accommodation Preferences */}
      <div>
        <label
          htmlFor="accommodationPreferences"
          className="block text-sm font-medium text-slate-700"
        >
          Accommodation Preferences{" "}
          <span className="text-slate-400">(optional)</span>
        </label>
        <p className="mt-1 text-xs text-slate-400">
          This information is kept confidential and shared only when relevant.
        </p>
        <textarea
          id="accommodationPreferences"
          name="accommodationPreferences"
          rows={3}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
          placeholder="e.g., screen reader support, flexible scheduling, captioning for meetings"
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-slate-700"
        >
          Resume Upload
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="mt-2 w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-navy-50 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-navy-700 hover:file:bg-navy-100"
        />
        <p className="mt-1 text-xs text-slate-400">
          PDF, DOC, or DOCX (max 10 MB)
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-navy-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Profile"}
      </button>
    </form>
  );
}
