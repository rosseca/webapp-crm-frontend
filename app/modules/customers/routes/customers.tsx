import { useState, useCallback } from "react";
import type { Route } from "./+types/customers";
import { DataTable } from "../ui/data-table";
import { columns } from "../ui/columns";
import { useCustomers } from "../hooks/use-customers";
import type { Customer } from "../ui/schema";
import type { CustomersListParams } from "~/lib/api";

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

  const { data, isLoading, error } = useCustomers(params);

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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view all your customers in one place.
        </p>
      </div>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          Error loading customers: {error.message}
        </div>
      )}
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
