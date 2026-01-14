import { useState, useEffect } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { TransactionsListParams } from "~/lib/api";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onFiltersChange: (filters: Partial<TransactionsListParams>) => void;
}

const transactionStatuses = [
  "all",
  "success",
  "failed",
  "in_process",
  "waiting_user_interaction",
];

const transactionTypes = ["all", "payment", "refund", "chargeback", "rdr"];

const paymentTypes = ["all", "initial", "recurring", "upgrade"];

const statusLabels: Record<string, string> = {
  all: "All Statuses",
  success: "Success",
  failed: "Failed",
  in_process: "In Process",
  waiting_user_interaction: "Waiting",
};

export function TransactionDataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  pagination,
  onPageChange,
  onFiltersChange,
}: DataTableProps<TData, TValue>) {
  const [search, setSearch] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("all");
  const [transactionType, setTransactionType] = useState("all");
  const [paymentType, setPaymentType] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange({ search: search || undefined });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search, onFiltersChange]);

  const handleTransactionStatusChange = (value: string) => {
    setTransactionStatus(value);
    onFiltersChange({
      transaction_status: value === "all" ? undefined : value,
    });
  };

  const handleTransactionTypeChange = (value: string) => {
    setTransactionType(value);
    onFiltersChange({
      transaction_type: value === "all" ? undefined : value,
    });
  };

  const handlePaymentTypeChange = (value: string) => {
    setPaymentType(value);
    onFiltersChange({
      payment_type: value === "all" ? undefined : value,
    });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateFrom(value);
    onFiltersChange({
      date_from: value || undefined,
    });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateTo(value);
    onFiltersChange({
      date_to: value || undefined,
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setTransactionStatus("all");
    setTransactionType("all");
    setPaymentType("all");
    setDateFrom("");
    setDateTo("");
    onFiltersChange({
      search: undefined,
      transaction_status: undefined,
      transaction_type: undefined,
      payment_type: undefined,
      date_from: undefined,
      date_to: undefined,
    });
  };

  const hasFilters =
    search ||
    transactionStatus !== "all" ||
    transactionType !== "all" ||
    paymentType !== "all" ||
    dateFrom ||
    dateTo;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pagination.totalPages,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search by ID, customer, subscription..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
        />
        <Select
          value={transactionStatus}
          onValueChange={handleTransactionStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {transactionStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {statusLabels[status] ||
                  status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={transactionType}
          onValueChange={handleTransactionTypeChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {transactionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type === "all"
                  ? "All Types"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={paymentType} onValueChange={handlePaymentTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Payment Type" />
          </SelectTrigger>
          <SelectContent>
            {paymentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type === "all"
                  ? "All Payment Types"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">From:</span>
          <Input
            type="date"
            value={dateFrom}
            onChange={handleDateFromChange}
            className="w-[160px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">To:</span>
          <Input
            type="date"
            value={dateTo}
            onChange={handleDateToChange}
            className="w-[160px]"
          />
        </div>
        {hasFilters && (
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {data.length} of {pagination.total} transactions
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1 || isLoading}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
