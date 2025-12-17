import type { Route } from "./+types/transactions";
import { TransactionDataTable } from "../ui/data-table";
import { columns } from "../ui/columns";
import { fakeTransactions } from "../ui/data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Transactions | LeadtechCRM" },
    { name: "description", content: "Manage your transactions" },
  ];
}

export default function Transactions() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all your transactions in one place.
        </p>
      </div>
      <TransactionDataTable columns={columns} data={fakeTransactions} />
    </div>
  );
}
