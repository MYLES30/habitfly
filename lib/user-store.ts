import { promises as fs } from "fs";
import path from "path";
import { hash } from "bcryptjs";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

type UsersFileShape = {
  users: UserRecord[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(USERS_FILE);
  } catch {
    const initialData: UsersFileShape = { users: [] };
    await fs.writeFile(USERS_FILE, JSON.stringify(initialData, null, 2), "utf8");
  }
}

async function readStore(): Promise<UsersFileShape> {
  await ensureStoreFile();
  const content = await fs.readFile(USERS_FILE, "utf8");

  try {
    const parsed = JSON.parse(content) as Partial<UsersFileShape>;
    return { users: Array.isArray(parsed.users) ? parsed.users : [] };
  } catch {
    return { users: [] };
  }
}

async function writeStore(store: UsersFileShape) {
  await fs.writeFile(USERS_FILE, JSON.stringify(store, null, 2), "utf8");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
}

export async function findUserByEmail(email: string) {
  const store = await readStore();
  const normalizedEmail = normalizeEmail(email);
  return store.users.find((user) => user.email === normalizedEmail) ?? null;
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const store = await readStore();
  const normalizedEmail = normalizeEmail(input.email);
  const now = new Date().toISOString();

  const existing = store.users.find((user) => user.email === normalizedEmail);
  if (existing) {
    throw new Error("A user with this email already exists");
  }

  const passwordHash = await hash(input.password, 12);

  const created: UserRecord = {
    id: createId("usr"),
    name: input.name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: now,
    updatedAt: now
  };

  store.users.unshift(created);
  await writeStore(store);

  return {
    id: created.id,
    name: created.name,
    email: created.email,
    createdAt: created.createdAt
  };
}
