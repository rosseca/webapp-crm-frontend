import { type ColumnDef } from "@tanstack/react-table";
import type { Customer, SubscriptionStatus, PSPStatus } from "./schema";
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

function getSubscriptionStatusVariant(
  status: SubscriptionStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "active":
      return "default";
    case "pending":
      return "secondary";
    case "inactive":
    case "cancelled":
    case "expired":
      return "destructive";
    default:
      return "outline";
  }
}

function getPSPStatusVariant(
  status: PSPStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "connected":
      return "default";
    case "pending":
      return "secondary";
    case "disconnected":
    case "error":
      return "destructive";
    default:
      return "outline";
  }
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerId",
    header: "Customer ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("customerId")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "domain",
    header: "Domain",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("domain")}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionType",
    header: "Subscription Type",
    cell: ({ row }) => {
      const type = row.getValue("subscriptionType") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "subscriptionStatus",
    header: "Subscription Status",
    cell: ({ row }) => {
      const status = row.getValue("subscriptionStatus") as SubscriptionStatus;
      return (
        <Badge variant={getSubscriptionStatusVariant(status)} className="capitalize">
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "pspStatus",
    header: "PSP Status",
    cell: ({ row }) => {
      const status = row.getValue("pspStatus") as PSPStatus;
      return (
        <Badge variant={getPSPStatusVariant(status)} className="capitalize">
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "registrationDate",
    header: "Registration Date",
    cell: ({ row }) => (
      <span className="text-sm">
        {formatDate(row.getValue("registrationDate"))}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionActivationDate",
    header: "Subscription Activation Date",
    cell: ({ row }) => (
      <span className="text-sm">
        {formatDate(row.getValue("subscriptionActivationDate"))}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionId",
    header: "Subscription ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("subscriptionId")}</span>
    ),
  },
];
