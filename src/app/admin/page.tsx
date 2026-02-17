import type { Metadata } from "next";
import { AdminDashboard } from "./dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard — MissionAble Systems",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
