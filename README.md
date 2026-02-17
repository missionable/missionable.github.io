# MissionAble Systems

Professional talent platform connecting skilled tech professionals with disabilities to employers and federal contractors.

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Language:** TypeScript

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (navbar + footer)
│   ├── globals.css           # Tailwind + custom theme
│   ├── join/
│   │   ├── page.tsx          # Talent sign-up page
│   │   └── talent-form.tsx   # Talent form component
│   ├── employers/
│   │   ├── page.tsx          # Employer contact page
│   │   └── employer-form.tsx # Employer form component
│   └── admin/
│       ├── page.tsx          # Admin dashboard (protected)
│       ├── dashboard.tsx     # Dashboard component
│       └── login/
│           ├── page.tsx      # Admin login page
│           └── login-form.tsx
├── components/
│   ├── navbar.tsx
│   └── footer.tsx
└── lib/
    ├── supabase.ts           # Supabase client
    └── constants.ts          # Shared constants
supabase/
└── schema.sql                # Database schema + RLS policies
```

## Setup Instructions

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd missionable
npm install
```

### 2. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **anon (public) key** from **Settings → API**.

### 3. Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**.
2. Paste the contents of `supabase/schema.sql` and click **Run**.

This creates:
- `talents` table for professional profiles
- `employer_inquiries` table for employer contact submissions
- `resumes` storage bucket (private)
- Row Level Security policies (anonymous insert, authenticated read)

### 4. Create an Admin User

1. In Supabase dashboard, go to **Authentication → Users**.
2. Click **Add User → Create New User**.
3. Enter an email (e.g., `admin@missionable.systems`) and a strong password.
4. This user will be able to log in at `/admin/login` to access the dashboard.

### 5. Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route            | Description                              |
| ---------------- | ---------------------------------------- |
| `/`              | Landing page with hero, how-it-works     |
| `/join`          | Talent sign-up form                      |
| `/employers`     | Employer contact/inquiry form            |
| `/admin/login`   | Admin authentication                     |
| `/admin`         | Protected dashboard with talent profiles |

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial MissionAble MVP"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**.

### 3. Configure Supabase for Production

In your Supabase project settings under **Authentication → URL Configuration**:
- Add your Vercel production URL to **Site URL**
- Add it to **Redirect URLs** as well

## Database Schema

### talents

| Column                       | Type        | Notes                        |
| ---------------------------- | ----------- | ---------------------------- |
| id                           | uuid (PK)   | Auto-generated               |
| full_name                    | text        | Required                     |
| email                        | text        | Required, unique             |
| linkedin                     | text        | Optional                     |
| tech_stack                   | text[]      | Array of skill names         |
| years_of_experience          | integer     | Required                     |
| clearance_eligible           | boolean     | Required                     |
| work_preference              | text        | Remote / Hybrid / Onsite     |
| accommodation_preferences    | text        | Optional, confidential       |
| resume_path                  | text        | File path in Supabase Storage|
| created_at                   | timestamptz | Auto-generated               |

### employer_inquiries

| Column           | Type        | Notes                |
| ---------------- | ----------- | -------------------- |
| id               | uuid (PK)   | Auto-generated       |
| company_name     | text        | Required             |
| contact_email    | text        | Required             |
| role_description | text        | Required             |
| required_skills  | text[]      | Array of skill names |
| created_at       | timestamptz | Auto-generated       |

## Design Principles

- Corporate, enterprise-ready aesthetic
- Navy/white/gray color scheme
- Semantic HTML with ARIA attributes
- Accessible focus indicators and contrast ratios
- Responsive (desktop + tablet first)
