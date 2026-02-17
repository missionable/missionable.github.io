-- ============================================================
-- MissionAble Systems — Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Talent Profiles
create table public.talents (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null unique,
  linkedin text,
  tech_stack text[] not null default '{}',
  years_of_experience integer not null,
  clearance_eligible boolean not null default false,
  work_preference text not null check (work_preference in ('Remote', 'Hybrid', 'Onsite')),
  accommodation_preferences text,
  resume_path text,
  created_at timestamptz default now()
);

-- 2. Employer Inquiries
create table public.employer_inquiries (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  contact_email text not null,
  role_description text not null,
  required_skills text[] not null default '{}',
  created_at timestamptz default now()
);

-- 3. Row Level Security
alter table public.talents enable row level security;
alter table public.employer_inquiries enable row level security;

-- Allow anonymous inserts (public form submissions)
create policy "Allow public talent sign-up"
  on public.talents for insert
  to anon
  with check (true);

create policy "Allow public employer inquiries"
  on public.employer_inquiries for insert
  to anon
  with check (true);

-- Allow authenticated users (admin) full read access
create policy "Allow authenticated read talents"
  on public.talents for select
  to authenticated
  using (true);

create policy "Allow authenticated read employer inquiries"
  on public.employer_inquiries for select
  to authenticated
  using (true);

-- 4. Storage bucket for resumes
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Allow anonymous uploads to resumes bucket
create policy "Allow public resume upload"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'resumes');

-- Allow authenticated users to read/download resumes
create policy "Allow authenticated resume download"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'resumes');
