import type { Route } from "./+types/signup";
import { SignupForm } from "../ui/signup-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up | LeadtechCRM" },
    { name: "description", content: "Create a new LeadtechCRM account" },
  ];
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignupForm />
    </div>
  );
}
