import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | LeadtechCRM" },
    { name: "description", content: "LeadtechCRM Dashboard" },
  ];
}

export default function Home() {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground text-sm mt-1">
        Welcome to LeadtechCRM. Here's an overview of your business.
      </p>
    </div>
  );
}
