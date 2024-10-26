"use client";
import { Card } from "@/components";
import { useSearchMovies } from "@/hooks";
import { useStore } from "@/store";
import { useIntersection } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const Content = () => {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("search");

  const { data, isLoading } = useSearchMovies(searchKeyword || ""); // Always call hook
  const { page, setPage } = useStore("SEARCH");

  // Reference for the intersection observer
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: loadMoreRef.current,
    threshold: 1, // Trigger when the last element is fully visible
  });

  // Load more movies when the last element comes into view
  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage(page + 1);
    }
  }, [entry]);

  // Early return if there's no search keyword
  if (data.length === 0) {
    return (
      <main className="px-4 py-4 md:px-12">
        <h4 className="mb-2 font-title">Search</h4>
        <p>No movie found</p>
      </main>
    );
  }

  return (
    <main className="px-4 py-4 md:px-12">
      <h4 className="text-md mb-2 font-title">Search</h4>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-4">
        {data?.map(({ id, title, poster_path, release_date }) => (
          <Card
            key={id}
            id={id}
            title={title}
            poster_path={poster_path}
            release_date={release_date}
            type="Movie"
          />
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-60 animate-pulse rounded-md bg-gray-400"
            />
          ))}
      </div>

      {/* Intersection observer target for infinite scroll */}
      <div ref={ref} />
    </main>
  );
};

const Search = () => {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
};

export default Search;
