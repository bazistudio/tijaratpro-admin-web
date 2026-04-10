import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";

export default function SuperAdminDashboard() {
  return (
    <div className="flex">

      <Sidebar role="super" />

      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Super Admin Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-4">

          <StatCard
            title="Total Shops"
            value={12}
          />

          <StatCard
            title="Total Users"
            value={45}
          />

          <StatCard
            title="Total Orders"
            value={120}
          />

        </div>

      </div>

    </div>
  );
}