import AdminDashboard from "@/components/admin/AdminDashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // no cache

async function getDashboardStats() {
  const cookieStore = await cookies(); // Next 16: async
  const token = cookieStore.get("admin_access_token")?.value;

  if (!token) redirect("/admin/login");
  const base = process.env.API_BASE_URL;
  const url = new URL("/v1/admin/dashboard/stats", base);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) redirect("/admin/login");
  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to load dashboard stats");
  }

  return data;
}

export default async function AdminDashboardPage() {
  // const data = await getDashboardStats();

  return (
    <section className=" ">
      <AdminDashboard />
    </section>
  );
}
