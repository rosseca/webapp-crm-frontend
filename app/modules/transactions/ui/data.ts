import type {
  Transaction,
  TransactionStatus,
  TransactionType,
  PaymentMethod,
} from "./schema";

const transactionStatuses: TransactionStatus[] = [
  "completed",
  "pending",
  "failed",
  "refunded",
  "cancelled",
];

const transactionTypes: TransactionType[] = [
  "payment",
  "refund",
  "subscription",
  "one-time",
];

const paymentMethods: PaymentMethod[] = [
  "credit_card",
  "debit_card",
  "bank_transfer",
  "paypal",
  "crypto",
];

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"];

const descriptions = [
  "Monthly subscription payment",
  "Premium plan upgrade",
  "Enterprise license renewal",
  "Basic plan subscription",
  "Refund for cancelled service",
  "One-time setup fee",
  "Additional user license",
  "Storage upgrade",
  "API access fee",
  "Support package",
];

const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Sarah",
  "David",
  "Emily",
  "Robert",
  "Lisa",
  "William",
  "Jennifer",
  "James",
  "Amanda",
  "Thomas",
  "Jessica",
  "Daniel",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Wilson",
  "Anderson",
  "Thomas",
];

const domains = [
  "acme.com",
  "techcorp.io",
  "globalsoft.net",
  "innovate.co",
  "dataflow.org",
  "cloudpeak.com",
  "nexgen.io",
  "smartsys.net",
  "futuretech.co",
  "digitaledge.org",
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function generateTransactionId(): string {
  return `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

function generateCustomerId(): string {
  return `CUS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

function generateTransaction(): Transaction {
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const domain = randomElement(domains);
  const customerEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;

  const status = randomElement(transactionStatuses);
  const type = randomElement(transactionTypes);
  const createdAt = randomDate(new Date(2023, 0, 1), new Date());

  const completedAt =
    status === "completed"
      ? randomDate(createdAt, new Date())
      : undefined;

  const amount = Math.floor(Math.random() * 1000) + 10;

  return {
    transactionId: generateTransactionId(),
    customerId: generateCustomerId(),
    customerEmail,
    amount: amount + Math.random() * 0.99,
    currency: randomElement(currencies),
    status,
    type,
    paymentMethod: randomElement(paymentMethods),
    createdAt,
    completedAt,
    description: randomElement(descriptions),
  };
}

export function generateTransactions(count: number): Transaction[] {
  return Array.from({ length: count }, generateTransaction);
}

export const fakeTransactions: Transaction[] = generateTransactions(50);
