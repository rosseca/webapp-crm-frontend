import type {
  Customer,
  SubscriptionType,
  SubscriptionStatus,
  PSPStatus,
} from "./schema";

const subscriptionTypes: SubscriptionType[] = [
  "free",
  "basic",
  "premium",
  "enterprise",
];
const subscriptionStatuses: SubscriptionStatus[] = [
  "active",
  "inactive",
  "cancelled",
  "pending",
  "expired",
];
const pspStatuses: PSPStatus[] = ["connected", "disconnected", "pending", "error"];

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
  "bluechip.com",
  "redstone.io",
  "greenmedia.net",
  "yellowbox.co",
  "purplelabs.org",
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
  "Ashley",
  "Matthew",
  "Nicole",
  "Andrew",
  "Stephanie",
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
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function generateCustomerId(): string {
  return `CUS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

function generateSubscriptionId(): string {
  return `SUB-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

function generateCustomer(): Customer {
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const domain = randomElement(domains);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;

  const registrationDate = randomDate(new Date(2022, 0, 1), new Date());
  const subscriptionStatus = randomElement(subscriptionStatuses);

  const subscriptionActivationDate =
    subscriptionStatus === "active" || subscriptionStatus === "expired"
      ? randomDate(registrationDate, new Date())
      : undefined;

  return {
    customerId: generateCustomerId(),
    email,
    domain,
    subscriptionType: randomElement(subscriptionTypes),
    subscriptionStatus,
    pspStatus: randomElement(pspStatuses),
    registrationDate,
    subscriptionActivationDate,
    subscriptionId: generateSubscriptionId(),
  };
}

export function generateCustomers(count: number): Customer[] {
  return Array.from({ length: count }, generateCustomer);
}

export const fakeCustomers: Customer[] = generateCustomers(50);
