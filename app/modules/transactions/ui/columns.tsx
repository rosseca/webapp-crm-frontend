import { type ColumnDef } from "@tanstack/react-table";
import type { Transaction, TransactionStatus, TransactionType, PaymentMethod } from "./schema";
import { Badge } from "~/components/ui/badge";

function formatDate(date: Date | undefined): string {
  if (!date) return "-";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function getStatusVariant(
  status: TransactionStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "failed":
    case "cancelled":
      return "destructive";
    case "refunded":
      return "outline";
    default:
      return "outline";
  }
}

function getTypeVariant(
  type: TransactionType
): "default" | "secondary" | "destructive" | "outline" {
  switch (type) {
    case "payment":
      return "default";
    case "subscription":
      return "secondary";
    case "refund":
      return "destructive";
    case "one-time":
      return "outline";
    default:
      return "outline";
  }
}

function formatPaymentMethod(method: PaymentMethod): string {
  const methodLabels: Record<PaymentMethod, string> = {
    credit_card: "Credit Card",
    debit_card: "Debit Card",
    bank_transfer: "Bank Transfer",
    paypal: "PayPal",
    crypto: "Crypto",
  };
  return methodLabels[method];
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("transactionId")}</span>
    ),
  },
  {
    accessorKey: "customerEmail",
    header: "Customer",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("customerEmail")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const currency = row.original.currency;
      return (
        <span
          className={`text-sm font-medium ${
            amount < 0 ? "text-destructive" : ""
          }`}
        >
          {formatCurrency(amount, currency)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TransactionStatus;
      return (
        <Badge variant={getStatusVariant(status)} className="capitalize">
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as TransactionType;
      return (
        <Badge variant={getTypeVariant(type)} className="capitalize">
          {type}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const method = row.getValue("paymentMethod") as PaymentMethod;
      return (
        <span className="text-sm text-muted-foreground">
          {formatPaymentMethod(method)}
        </span>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground max-w-[200px] truncate block">
        {row.getValue("description")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.getValue("createdAt"))}</span>
    ),
  },
  {
    accessorKey: "completedAt",
    header: "Completed",
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.getValue("completedAt"))}</span>
    ),
  },
];
