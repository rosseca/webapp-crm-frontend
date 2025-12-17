import type { Route } from "./+types/login";
import { LoginForm } from "../ui/login-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | LeadtechCRM" },
    { name: "description", content: "Login to LeadtechCRM" },
  ];
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoginForm />
    </div>
  );
}
