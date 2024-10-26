"use client";
import {
  getMovie,
  getPopularMovies,
  isFavouriteMovie,
  searchMovies,
} from "@/actions";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const usePopularMovies = () => {
  const { page } = useStore("MOVIES");
  const [movies, setMovies] = useState<any[]>([]); // Cumulative movie data

  const { data, isLoading } = useQuery<any[], Error>({
    queryKey: [`popular-movie-${page}`],
    queryFn: () => getPopularMovies(page),
  });

  // Use useEffect to update movies when data changes
  useEffect(() => {
    if (data) {
      setMovies((prevMovies) => [...prevMovies, ...data]); // Append new data to movies
    }
  }, [data, page]); // Effect runs when data changes

  return { data: movies, isLoading };
};

export const useMovie = (movieId: string) => {
  const { data, isLoading } = useQuery<any[], Error>({
    queryKey: [`movie-${movieId}`],
    queryFn: () => getMovie(movieId),
  });

  return { data, isLoading };
};

// Hook to check if a single movie ID is a favourite
export const useIsFavouriteMovie = (movieId: string) => {
  const { data, isLoading } = useQuery<boolean, Error>({
    queryKey: ["is-favourite-movie", movieId],
    queryFn: () => isFavouriteMovie(movieId), // Pass the single movie ID
  });

  return { isFavourite: data ?? false, isLoading };
};

export const useSearchMovies = (keyword: string) => {
  const { page } = useStore("SEARCH");
  const [movies, setMovies] = useState<any[]>([]); // Cumulative movie data

  const { data, isLoading } = useQuery<any[], Error>({
    queryKey: [`seach-movie-${page}-${keyword}`],
    queryFn: () => searchMovies(keyword, page),
  });

  // Use useEffect to update movies when data changes
  useEffect(() => {
    if (data) {
      setMovies((prevMovies) => [...prevMovies, ...data]); // Append new data to movies
    }
  }, [data]); // Effect runs when data changes

  return { data: movies, isLoading };
};
