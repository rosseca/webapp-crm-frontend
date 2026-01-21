import { useState, useCallback } from "react";
import type { Route } from "./+types/transactions";
import { TransactionDataTable } from "../ui/data-table";
import { columns } from "../ui/columns";
import { useTransactions } from "../hooks/use-transactions";
import type { Transaction } from "../ui/schema";
import type { TransactionsListParams } from "~/lib/api";
import { ApiErrorAlert } from "~/components/ui/api-error-alert";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Transactions | LeadtechCRM" },
    { name: "description", content: "Manage your transactions" },
  ];
}

const PAGE_SIZE = 20;

export default function Transactions() {
  const [params, setParams] = useState<TransactionsListParams>({
    page: 1,
    limit: PAGE_SIZE,
  });

  const { data, isLoading, error, refetch } = useTransactions(params);

  const transactions: Transaction[] = data?.data ?? [];
  const pagination = {
    page: data?.page ?? 1,
    limit: data?.limit ?? PAGE_SIZE,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
  };

  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const handleFiltersChange = useCallback((filters: Partial<TransactionsListParams>) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="py-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View and manage all your transactions in one place.
        </p>
      </div>
      <ApiErrorAlert error={error} onRetry={handleRetry} />
      <TransactionDataTable
        columns={columns}
        data={transactions}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
}
