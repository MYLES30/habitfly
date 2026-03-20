import { promises as fs } from "fs";
import path from "path";

export type HabitGuideSubscriber = {
  id: string;
  email: string;
  source: string;
  createdAt: string;
};

type HabitGuideStoreShape = {
  subscribers: HabitGuideSubscriber[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const HABIT_GUIDE_SUBSCRIBERS_FILE = path.join(DATA_DIR, "habit-guide-subscribers.json");

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(HABIT_GUIDE_SUBSCRIBERS_FILE);
  } catch {
    const initialData: HabitGuideStoreShape = { subscribers: [] };
    await fs.writeFile(HABIT_GUIDE_SUBSCRIBERS_FILE, JSON.stringify(initialData, null, 2), "utf8");
  }
}

async function readStore(): Promise<HabitGuideStoreShape> {
  await ensureStoreFile();
  const content = await fs.readFile(HABIT_GUIDE_SUBSCRIBERS_FILE, "utf8");

  try {
    const parsed = JSON.parse(content) as Partial<HabitGuideStoreShape>;
    return { subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [] };
  } catch {
    return { subscribers: [] };
  }
}

async function writeStore(store: HabitGuideStoreShape) {
  await fs.writeFile(HABIT_GUIDE_SUBSCRIBERS_FILE, JSON.stringify(store, null, 2), "utf8");
}

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
}

type AddSubscriberResult = {
  record: HabitGuideSubscriber;
  alreadyExists: boolean;
};

export async function addHabitGuideSubscriber(email: string): Promise<AddSubscriberResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const store = await readStore();
  const existing = store.subscribers.find((subscriber) => subscriber.email.toLowerCase() === normalizedEmail);

  if (existing) {
    return { record: existing, alreadyExists: true };
  }

  const created: HabitGuideSubscriber = {
    id: createId("sub"),
    email: normalizedEmail,
    source: "habit-guide",
    createdAt: new Date().toISOString()
  };

  store.subscribers.unshift(created);
  await writeStore(store);

  return { record: created, alreadyExists: false };
}
