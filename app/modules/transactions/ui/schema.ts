import * as v from "valibot";

export const TransactionStatusSchema = v.picklist([
  "completed",
  "pending",
  "failed",
  "refunded",
  "cancelled",
]);

export const TransactionTypeSchema = v.picklist([
  "payment",
  "refund",
  "subscription",
  "one-time",
]);

export const PaymentMethodSchema = v.picklist([
  "credit_card",
  "debit_card",
  "bank_transfer",
  "paypal",
  "crypto",
]);

export const TransactionSchema = v.object({
  transactionId: v.string(),
  customerId: v.string(),
  customerEmail: v.pipe(v.string(), v.email()),
  amount: v.number(),
  currency: v.string(),
  status: TransactionStatusSchema,
  type: TransactionTypeSchema,
  paymentMethod: PaymentMethodSchema,
  createdAt: v.date(),
  completedAt: v.optional(v.date()),
  description: v.string(),
});

export type Transaction = v.InferOutput<typeof TransactionSchema>;
export type TransactionStatus = v.InferOutput<typeof TransactionStatusSchema>;
export type TransactionType = v.InferOutput<typeof TransactionTypeSchema>;
export type PaymentMethod = v.InferOutput<typeof PaymentMethodSchema>;
