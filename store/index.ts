"use client";
import { useMovieSearchStore, useMovieStore } from "./movies";

type STORE = "MOVIES" | "SEARCH";

export const useStore = (store: STORE) => {
  switch (store) {
    case "MOVIES":
      return useMovieStore();
    case "SEARCH":
      return useMovieSearchStore();
    default:
      throw new Error("Unknown store");
  }
};
