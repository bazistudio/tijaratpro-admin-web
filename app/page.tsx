import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root domain to the dashboard.
  // Middleware will intercept this and redirect to /login if unauthenticated.
  redirect("/dashboard");
}
