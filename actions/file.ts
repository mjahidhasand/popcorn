"use server";
import fs from "fs/promises";
import { getTracker } from "./tracker";
import { revalidatePath } from "next/cache";

const WATCHLIST_FOLDER = "tmp";
const WATCHLIST_FILE = `${WATCHLIST_FOLDER}/watchlist.json`;

export type WatchlistItem = {
  tracker: string;
  ids: string[];
};

export type Watchlist = WatchlistItem[];

// Ensure the folder and file exist
const ensureWatchlistFile = async () => {
  try {
    await fs.mkdir(WATCHLIST_FOLDER, { recursive: true });
    try {
      await fs.access(WATCHLIST_FILE);
    } catch {
      await fs.writeFile(WATCHLIST_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Failed to ensure watchlist file:", error);
  }
};

export const readWatchlist = async (): Promise<Watchlist> => {
  try {
    await ensureWatchlistFile();
    const data = await fs.readFile(WATCHLIST_FILE, "utf-8");

    return data.trim() ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to read watchlist:", error);
    return [];
  }
};

const writeWatchlist = async (watchlist: Watchlist) => {
  await fs.writeFile(WATCHLIST_FILE, JSON.stringify(watchlist, null, 2));
};

export const addToFavourite = async (id: string) => {
  const tracker = await getTracker();
  const currentWatchlist: Watchlist = await readWatchlist();

  const trackerEntry = currentWatchlist.find(
    (item) => item.tracker === tracker,
  );

  if (trackerEntry) {
    if (trackerEntry.ids.includes(id)) {
      console.log(`ID ${id} already exists for tracker ${tracker}.`);
      return;
    }
    trackerEntry.ids.push(id);
  } else {
    const newEntry: WatchlistItem = { tracker, ids: [id] };
    currentWatchlist.push(newEntry);
  }

  await writeWatchlist(currentWatchlist);
};

export const isFavouriteMovie = async (id: string): Promise<boolean> => {
  const tracker = await getTracker();
  const currentWatchlist: Watchlist = await readWatchlist();

  return currentWatchlist.some(
    (item) => item.tracker === tracker && item.ids.includes(id),
  );
};

export const removeFromFavourite = async (id: string) => {
  const tracker = await getTracker();
  let currentWatchlist: Watchlist = await readWatchlist();

  const trackerEntry = currentWatchlist.find(
    (item) => item.tracker === tracker,
  );

  if (trackerEntry) {
    const idIndex = trackerEntry.ids.indexOf(id);
    if (idIndex === -1) {
      console.log(`ID ${id} does not exist for tracker ${tracker}.`);
      return;
    }
    trackerEntry.ids.splice(idIndex, 1);

    if (trackerEntry.ids.length === 0) {
      currentWatchlist = currentWatchlist.filter(
        (item) => item.tracker !== tracker,
      );
    }

    await writeWatchlist(currentWatchlist);
    revalidatePath("/");
  }
};

export const getWatchlist = async (): Promise<WatchlistItem | null> => {
  const tracker = await getTracker();
  const watchlist = await readWatchlist();

  return watchlist.find(
    (item: WatchlistItem) => item.tracker === tracker,
  ) || null;
};
