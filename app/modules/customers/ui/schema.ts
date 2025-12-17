import * as v from "valibot";

export const SubscriptionTypeSchema = v.picklist([
  "free",
  "basic",
  "premium",
  "enterprise",
]);

export const SubscriptionStatusSchema = v.picklist([
  "active",
  "inactive",
  "cancelled",
  "pending",
  "expired",
]);

export const PSPStatusSchema = v.picklist([
  "connected",
  "disconnected",
  "pending",
  "error",
]);

export const CustomerSchema = v.object({
  customerId: v.string(),
  email: v.pipe(v.string(), v.email()),
  domain: v.string(),
  subscriptionType: SubscriptionTypeSchema,
  subscriptionStatus: SubscriptionStatusSchema,
  pspStatus: PSPStatusSchema,
  registrationDate: v.date(),
  subscriptionActivationDate: v.optional(v.date()),
  subscriptionId: v.string(),
});

export type Customer = v.InferOutput<typeof CustomerSchema>;
export type SubscriptionType = v.InferOutput<typeof SubscriptionTypeSchema>;
export type SubscriptionStatus = v.InferOutput<typeof SubscriptionStatusSchema>;
export type PSPStatus = v.InferOutput<typeof PSPStatusSchema>;
