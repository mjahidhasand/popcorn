"use server";
import { generateTrackerId } from "@/lib";
import { cookies } from "next/headers";

export const getTracker = async () => {
  const cookieStore = await cookies();
  let trackerCookie = cookieStore.get("tracker");

  if (!trackerCookie) {
    const newTracker = generateTrackerId();
    cookieStore.set("tracker", newTracker);
    return newTracker;
  }

  return trackerCookie.value;
};
