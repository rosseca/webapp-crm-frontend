import type { Route } from "./+types/customers";
import { DataTable } from "../ui/data-table";
import { columns } from "../ui/columns";
import { fakeCustomers } from "../ui/data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Customers | LeadtechCRM" },
    { name: "description", content: "Manage your customers" },
  ];
}

export default function Customers() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view all your customers in one place.
        </p>
      </div>
      <DataTable columns={columns} data={fakeCustomers} />
    </div>
  );
}
