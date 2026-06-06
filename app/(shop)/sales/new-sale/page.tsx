import { redirect } from "next/navigation";

// /sales/new-sale → canonical POS at /sales/create
export default function SalesNewSalePage() {
  redirect("/sales/create");
}
