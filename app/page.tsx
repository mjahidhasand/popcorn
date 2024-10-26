"use client";
import { Card } from "@/components";
import { usePopularMovies } from "@/hooks";
import { useStore } from "@/store";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";

const Home = () => {
  const { data, isLoading } = usePopularMovies();
  const { page, setPage } = useStore("MOVIES");

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

  return (
    <main className="px-4 py-4 md:px-12">
      <h4 className="text-md mb-2 font-title">Popular</h4>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-4">
        {data?.map(({ id, title, poster_path, release_date }, index) => (
          <Card
            key={id + index}
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

export default Home;
