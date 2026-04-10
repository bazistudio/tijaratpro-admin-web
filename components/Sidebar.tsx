"use client";

import Link from "next/link";

export default function Sidebar({ role }: { role: string }) {
  return (
    <div className="w-64 h-screen bg-blue-600 text-white p-4">

      <h1 className="text-2xl font-bold mb-6">
        TijaratPro
      </h1>

      {role === "super" && (
        <>
          <Link href="/super-admin/dashboard">
            <p className="mb-3">Dashboard</p>
          </Link>

          <Link href="/super-admin/shops">
            <p className="mb-3">Shops</p>
          </Link>

          <Link href="/super-admin/users">
            <p className="mb-3">Users</p>
          </Link>
        </>
      )}

      {role === "shop" && (
        <>
          <Link href="/shop/dashboard">
            <p className="mb-3">Dashboard</p>
          </Link>

          <Link href="/shop/products">
            <p className="mb-3">Products</p>
          </Link>

          <Link href="/shop/orders">
            <p className="mb-3">Orders</p>
          </Link>
        </>
      )}

    </div>
  );
}