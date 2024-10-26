"use server";
import { getWatchlist, WatchlistItem } from "@/actions";

const apiKey = process.env.TMDB_API_KEY;
const baseURL = process.env.TMDB_BASE_URL;

/**
 * Formats the URL for TMDB API requests.
 *
 * @param endpoint - The API endpoint to fetch.
 * @param options - An object containing optional parameters.
 * @returns The formatted URL string.
 */
const formatURL = (
  endpoint: string,
  options: { page?: number; include_adult?: boolean } = {},
) => {
  let url = baseURL + endpoint + "?api_key=" + apiKey;

  // Add the include_adult parameter if specified
  if (options.include_adult !== undefined) {
    url += `&include_adult=${options.include_adult}`;
  } else {
    url += `&include_adult=false`; // Default to false
  }

  // Append the page parameter if provided
  if (options.page) {
    url += `&page=${options.page}`;
  }

  return url;
};

/**
 * Fetches popular movies from the TMDB API.
 *
 * @param page - The page number for pagination. Default 1.
 * @returns A promise that resolves to an array of popular movies.
 * @throws An error if the fetch operation fails.
 */
export const getPopularMovies = async (page = 1): Promise<any[]> => {
  try {
    const response = await fetch(formatURL("/movie/popular", { page }), {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }

    const data = await response.json();
    return data.results; // TMDB handles the 20 movies per page automatically
  } catch (error) {
    console.log("🚀 ~ getPopularMovies ~ error:", error);
    return [];
  }
};

/**
 * Searches for movies using the TMDB API.
 *
 * @param query - The search query string.
 * @param page - The page number for pagination (optional).
 * @returns A promise that resolves to an array of movie results.
 * @throws An error if the fetch operation fails.
 */
export const searchMovies = async (
  query: string,
  page?: number,
): Promise<any[]> => {
  let url =
    baseURL +
    "/search/movie?api_key=" +
    apiKey +
    `&query=${encodeURIComponent(query)}&page=${page}`;

  try {
    const response = await fetch(url, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results; // TMDB handles the 20 movies per page automatically
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return [];
  }
};

/**
 * Fetches details of a specific movie by its ID.
 *
 * @param movieId - The ID of the movie to fetch.
 * @returns A promise that resolves to the movie details.
 * @throws An error if the fetch operation fails.
 */
export const getMovie = async (movieId: string): Promise<any> => {
  try {
    const response = await fetch(formatURL(`/movie/${movieId}`), {
      cache: "force-cache",
    }); // No page parameter needed

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.log("🚀 ~ getMovie ~ error:", error);
    return {};
  }
};

/**
 * Fetches the cast credits of a specific movie by its ID.
 *
 * @param movieId - The ID of the movie to fetch the cast credits for.
 * @returns A promise that resolves to an array of cast members.
 * @throws An error if the fetch operation fails.
 */
export const getCast = async (movieId: string): Promise<any[]> => {
  try {
    const response = await fetch(
      formatURL(`/movie/${movieId}/credits`, { include_adult: true }),
      {
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cast credits: ${response.statusText}`);
    }

    const creditsData = await response.json();
    return creditsData.cast;
  } catch (error) {
    console.log("🚀 ~ getCast ~ error:", error);
    return [];
  }
};

/**
 * Fetches recommended movies based on a specific movie's ID.
 *
 * @param movieId - The ID of the movie for recommendations.
 * @returns A promise that resolves to an array of recommended movies.
 * @throws An error if the fetch operation fails.
 */
export const getRecommendMovies = async (movieId: string) => {
  const url = `/movie/${movieId}/recommendations`;
  try {
    const response = await fetch(formatURL(url, { include_adult: true }), {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch recommended movies: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.results; // TMDB handles the 20 recommended movies per page automatically
  } catch (error) {
    return {};
  }
};

export const getWatchlistMovies = async (): Promise<any[]> => {
  const trackerEntry: WatchlistItem | null = await getWatchlist();

  if (!trackerEntry) {
    return [];
  }

  const moviePromises = trackerEntry.ids.map((id: string) => getMovie(id));

  try {
    const movies = await Promise.all(moviePromises);
    return movies;
  } catch (error) {
    console.log("🚀 ~ getWatchlistMovies ~ error:", error);
    return [];
  }
};
