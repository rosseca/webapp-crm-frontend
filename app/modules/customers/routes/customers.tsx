import { useState, useCallback } from "react";
import type { Route } from "./+types/customers";
import { DataTable } from "../ui/data-table";
import { columns } from "../ui/columns";
import { useCustomers } from "../hooks/use-customers";
import type { Customer } from "../ui/schema";
import type { CustomersListParams } from "~/lib/api";
import { ApiErrorAlert } from "~/components/ui/api-error-alert";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Customers | LeadtechCRM" },
    { name: "description", content: "Manage your customers" },
  ];
}

const PAGE_SIZE = 20;

export default function Customers() {
  const [params, setParams] = useState<CustomersListParams>({
    page: 1,
    limit: PAGE_SIZE,
  });

  const { data, isLoading, error, refetch } = useCustomers(params);

  const customers: Customer[] = data?.data ?? [];
  const pagination = {
    page: data?.page ?? 1,
    limit: data?.limit ?? PAGE_SIZE,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
  };

  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const handleFiltersChange = useCallback((filters: Partial<CustomersListParams>) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="py-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage and view all your customers in one place.
        </p>
      </div>
      <ApiErrorAlert error={error} onRetry={handleRetry} />
      <DataTable
        columns={columns}
        data={customers}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
}
