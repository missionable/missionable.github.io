import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login — MissionAble Systems",
};

export default function AdminLoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900">
          Admin Login
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Access the MissionAble talent dashboard.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
