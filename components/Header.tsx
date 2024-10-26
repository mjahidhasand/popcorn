"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { EyeTrackingOnIcon, PersonArrowRightIcon, SearchIcon } from "./icons";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  // State to manage dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false); // Ensure darkMode is boolean
  const [search, setSearch] = useState("");

  // Effect to set initial theme based on local storage
  useEffect(() => {
    const storedMode = localStorage.getItem("dark-mode");
    if (storedMode) {
      setDarkMode(storedMode === "true");
      document.documentElement.classList.toggle("dark", storedMode === "true");
    }
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode; // This is boolean
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode); // Correctly toggling the class

    // Save preference as a string in local storage
    localStorage.setItem("dark-mode", String(newMode)); // Convert boolean to string
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="h-15 sticky top-0 z-10 flex w-full items-center justify-between border-b border-header_border bg-background px-3 py-2 md:px-12">
      <nav className="flex items-end gap-4">
        <Link href="/" className="mr-6">
          <img src="/logo.svg" alt="logo of popcorn" className="h-10" />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Link href="/" className="text-sm font-medium text-foreground">
            Movies
          </Link>
          <Link href="tv-shows" className="text-sm font-medium text-foreground">
            TV Shows
          </Link>
          <Link href="anime" className="text-sm font-medium text-foreground">
            Anime
          </Link>
        </div>
      </nav>

      <nav className="flex items-center gap-4">
        <form
          className="border-foreground/20 flex items-center rounded-md border p-1 pl-2"
          onSubmit={onSubmit}
        >
          <input
            name="search"
            type="text"
            className="border-none bg-transparent text-foreground outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-foreground/60">
            <SearchIcon />
          </button>
        </form>

        <button onClick={toggleDarkMode} className="p-1">
          {darkMode ? "Light" : "Dark"}
        </button>

        <Link href="/watchlist" className="p-1">
          <EyeTrackingOnIcon />
        </Link>

        <Link href="/" className="p-1">
          <PersonArrowRightIcon />
        </Link>
      </nav>
    </header>
  );
};
