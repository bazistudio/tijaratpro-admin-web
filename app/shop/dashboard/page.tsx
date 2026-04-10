import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";

export default function ShopDashboard() {
  return (
    <div className="flex">

      <Sidebar role="shop" />

      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Shop Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-4">

          <StatCard
            title="Products"
            value={85}
          />

          <StatCard
            title="Orders Today"
            value={14}
          />

          <StatCard
            title="Low Stock"
            value={5}
          />

        </div>

      </div>

    </div>
  );
}