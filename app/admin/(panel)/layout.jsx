import AdminSidebar from "../../../components/admin/AdminSitebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ">{children}</main>
      </div>
    </div>
  );
}
