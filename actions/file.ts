"use server";
import fs from "fs/promises";
import { getTracker } from "./tracker";
import { revalidatePath } from "next/cache";

const WATCHLIST_FILE = "tmp/watchlist.json";

export type WatchlistItem = {
  tracker: string;
  ids: string[];
};

export type Watchlist = WatchlistItem[];

export const readWatchlist = async (): Promise<Watchlist> => {
  try {
    // Check if the file exists, create it if not
    try {
      await fs.access(WATCHLIST_FILE);
    } catch {
      await fs.writeFile(WATCHLIST_FILE, JSON.stringify([]));
    }

    const data = await fs.readFile(WATCHLIST_FILE, "utf-8");

    // Return an empty array if the file is empty
    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data) as Watchlist;
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

  // Read existing watchlist
  const currentWatchlist: Watchlist = await readWatchlist();

  // Find the existing tracker entry or create a new one
  const trackerEntry = currentWatchlist.find(
    (item) => item.tracker === tracker,
  );

  if (trackerEntry) {
    // Check if the ID already exists for the same tracker
    if (trackerEntry.ids.includes(id)) {
      console.log(`ID ${id} already exists for tracker ${tracker}.`);
      return; // Exit the function if the ID already exists
    }

    // Add the new ID to the existing entry
    trackerEntry.ids.push(id);
  } else {
    // Create a new tracker entry if it doesn't exist
    const newEntry: WatchlistItem = { tracker, ids: [id] };
    currentWatchlist.push(newEntry);
  }

  // Write the updated array back to the file
  await writeWatchlist(currentWatchlist);
};

// Function to check if a single movie ID is a favourite
export const isFavouriteMovie = async (id: string): Promise<boolean> => {
  const tracker = await getTracker();

  // Read existing watchlist
  const currentWatchlist: Watchlist = await readWatchlist();

  // Check if the movie ID exists in the watchlist for the given tracker
  const idExists = currentWatchlist.some(
    (item) => item.tracker === tracker && item.ids.includes(id),
  );

  // Return true if the movie ID is found, otherwise return false
  return idExists;
};

export const removeFromFavourite = async (id: string) => {
  const tracker = await getTracker();

  // Read existing watchlist
  let currentWatchlist: Watchlist = await readWatchlist();

  // Find the existing tracker entry
  const trackerEntry = currentWatchlist.find(
    (item) => item.tracker === tracker,
  );

  if (trackerEntry) {
    // Check if the ID exists for the same tracker
    const idIndex = trackerEntry.ids.indexOf(id);
    console.log("🚀 ~ removeFromFavourite ~ idIndex:", idIndex);
    if (idIndex === -1) {
      console.log(`ID ${id} does not exist for tracker ${tracker}.`);
      return; // Exit the function if the ID does not exist
    }

    // Remove the ID from the existing entry
    trackerEntry.ids.splice(idIndex, 1);

    // If the IDs array is empty, remove the tracker entry
    if (trackerEntry.ids.length === 0) {
      currentWatchlist = currentWatchlist.filter(
        (item) => item.tracker !== tracker,
      );
    }

    // Write the updated array back to the file
    await writeWatchlist(currentWatchlist);
    revalidatePath("/");
  }
};

export const getWatchlist = async (): Promise<WatchlistItem | null> => {
  const tracker = await getTracker(); // Get the current tracker ID
  const watchlist = await readWatchlist(); // Read the watchlist

  // Filter the watchlist to find the specific tracker entry
  const trackerEntry = watchlist.find(
    (item: WatchlistItem) => item.tracker === tracker,
  );

  // Return the tracker entry or null if not found
  return trackerEntry || null;
};
