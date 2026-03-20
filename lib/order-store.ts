import { promises as fs } from "fs";
import path from "path";

export type OrderRecord = {
  id: string;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  amountTotal: number | null;
  currency: string | null;
  customerEmail: string | null;
  productId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type OrdersFileShape = {
  orders: OrderRecord[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(ORDERS_FILE);
  } catch {
    const initialData: OrdersFileShape = { orders: [] };
    await fs.writeFile(ORDERS_FILE, JSON.stringify(initialData, null, 2), "utf8");
  }
}

async function readStore(): Promise<OrdersFileShape> {
  await ensureStoreFile();
  const content = await fs.readFile(ORDERS_FILE, "utf8");

  try {
    const parsed = JSON.parse(content) as Partial<OrdersFileShape>;
    return { orders: Array.isArray(parsed.orders) ? parsed.orders : [] };
  } catch {
    return { orders: [] };
  }
}

async function writeStore(store: OrdersFileShape) {
  await fs.writeFile(ORDERS_FILE, JSON.stringify(store, null, 2), "utf8");
}

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
}

type UpsertOrderInput = {
  stripeSessionId: string;
  stripePaymentIntentId?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  customerEmail?: string | null;
  productId?: string | null;
  status: string;
};

export async function upsertOrderByStripeSession(input: UpsertOrderInput) {
  const store = await readStore();
  const now = new Date().toISOString();
  const existing = store.orders.find((order) => order.stripeSessionId === input.stripeSessionId);

  if (existing) {
    existing.stripePaymentIntentId = input.stripePaymentIntentId ?? existing.stripePaymentIntentId;
    existing.amountTotal = input.amountTotal ?? existing.amountTotal;
    existing.currency = input.currency ?? existing.currency;
    existing.customerEmail = input.customerEmail ?? existing.customerEmail;
    existing.productId = input.productId ?? existing.productId;
    existing.status = input.status;
    existing.updatedAt = now;
    await writeStore(store);
    return existing;
  }

  const created: OrderRecord = {
    id: createId("ord"),
    stripeSessionId: input.stripeSessionId,
    stripePaymentIntentId: input.stripePaymentIntentId ?? null,
    amountTotal: input.amountTotal ?? null,
    currency: input.currency ?? null,
    customerEmail: input.customerEmail ?? null,
    productId: input.productId ?? null,
    status: input.status,
    createdAt: now,
    updatedAt: now
  };

  store.orders.unshift(created);
  await writeStore(store);
  return created;
}

export async function listOrders() {
  const store = await readStore();
  return store.orders;
}
