"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { TECH_STACK_OPTIONS } from "@/lib/constants";

interface TalentProfile {
  id: string;
  full_name: string;
  email: string;
  linkedin: string | null;
  tech_stack: string[];
  years_of_experience: number;
  clearance_eligible: boolean;
  work_preference: string;
  accommodation_preferences: string | null;
  resume_path: string | null;
  created_at: string;
}

export function AdminDashboard() {
  const router = useRouter();
  const [talents, setTalents] = useState<TalentProfile[]>([]);
  const [filtered, setFiltered] = useState<TalentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Filters
  const [searchSkill, setSearchSkill] = useState("");
  const [clearanceFilter, setClearanceFilter] = useState<
    "all" | "yes" | "no"
  >("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setAuthChecked(true);
    }
    checkAuth();
  }, [router]);

  // Fetch talents once authenticated
  useEffect(() => {
    if (!authChecked) return;

    async function fetchTalents() {
      const { data, error } = await supabase
        .from("talents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch talents:", error.message);
      } else {
        setTalents(data || []);
        setFiltered(data || []);
      }
      setLoading(false);
    }
    fetchTalents();
  }, [authChecked]);

  // Apply filters
  const applyFilters = useCallback(() => {
    let result = [...talents];

    if (searchSkill) {
      const term = searchSkill.toLowerCase();
      result = result.filter((t) =>
        t.tech_stack.some((s) => s.toLowerCase().includes(term))
      );
    }

    if (clearanceFilter !== "all") {
      result = result.filter(
        (t) => t.clearance_eligible === (clearanceFilter === "yes")
      );
    }

    if (experienceFilter !== "all") {
      const min = parseInt(experienceFilter, 10);
      result = result.filter((t) => t.years_of_experience >= min);
    }

    setFiltered(result);
  }, [talents, searchSkill, clearanceFilter, experienceFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  async function getResumeUrl(path: string): Promise<string | null> {
    const { data } = await supabase.storage
      .from("resumes")
      .createSignedUrl(path, 60);
    return data?.signedUrl ?? null;
  }

  async function handleDownloadResume(path: string, name: string) {
    const url = await getResumeUrl(path);
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.replace(/\s+/g, "_")}_resume.${path.split(".").pop()}`;
      a.click();
    }
  }

  if (!authChecked || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Talent Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {talents.length} profile{talents.length !== 1 && "s"} in the network
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Sign Out
        </button>
      </div>

      {/* Filters */}
      <div className="mt-8 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
        {/* Skill search */}
        <div>
          <label
            htmlFor="searchSkill"
            className="block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Filter by Skill
          </label>
          <select
            id="searchSkill"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="">All Skills</option>
            {TECH_STACK_OPTIONS.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        {/* Clearance filter */}
        <div>
          <label
            htmlFor="clearanceFilter"
            className="block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Clearance Eligible
          </label>
          <select
            id="clearanceFilter"
            value={clearanceFilter}
            onChange={(e) =>
              setClearanceFilter(e.target.value as "all" | "yes" | "no")
            }
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="all">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Experience filter */}
        <div>
          <label
            htmlFor="experienceFilter"
            className="block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Min. Experience
          </label>
          <select
            id="experienceFilter"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="all">Any</option>
            <option value="3">3+ years</option>
            <option value="6">6+ years</option>
            <option value="10">10+ years</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mt-6 text-sm text-slate-500">
        Showing {filtered.length} of {talents.length} profiles
      </p>

      {/* Talent Cards */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-slate-500">
            No profiles match the current filters.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((talent) => (
            <TalentCard
              key={talent.id}
              talent={talent}
              onDownloadResume={handleDownloadResume}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TalentCard({
  talent,
  onDownloadResume,
}: {
  talent: TalentProfile;
  onDownloadResume: (path: string, name: string) => void;
}) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {talent.full_name}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">{talent.email}</p>
        </div>
        {talent.clearance_eligible && (
          <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Clearance Eligible
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {talent.tech_stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-1.5 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-700">Experience:</span>{" "}
          {talent.years_of_experience} year
          {talent.years_of_experience !== 1 && "s"}
        </p>
        <p>
          <span className="font-medium text-slate-700">Work Pref:</span>{" "}
          {talent.work_preference}
        </p>
        {talent.linkedin && (
          <p>
            <a
              href={talent.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy-600 hover:underline"
            >
              LinkedIn Profile
            </a>
          </p>
        )}
      </div>

      {talent.accommodation_preferences && (
        <div className="mt-3 rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-500">Accommodations</p>
          <p className="mt-0.5 text-sm text-slate-600">
            {talent.accommodation_preferences}
          </p>
        </div>
      )}

      <div className="mt-auto pt-4">
        {talent.resume_path ? (
          <button
            onClick={() =>
              onDownloadResume(talent.resume_path!, talent.full_name)
            }
            className="w-full rounded-lg border border-navy-200 bg-navy-50 px-4 py-2 text-sm font-medium text-navy-700 transition hover:bg-navy-100"
          >
            Download Resume
          </button>
        ) : (
          <p className="text-center text-xs text-slate-400">
            No resume uploaded
          </p>
        )}
      </div>

      <p className="mt-3 text-right text-xs text-slate-400">
        Joined {new Date(talent.created_at).toLocaleDateString()}
      </p>
    </article>
  );
}
