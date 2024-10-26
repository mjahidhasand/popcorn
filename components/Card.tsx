"use client";
import Link from "next/link";
import { getTMDBImgURL } from "@/lib";
import { DismissIcon } from "./icons";
import { removeFromFavourite } from "@/actions";
import Image from "next/image";

export interface CardProps {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
  type: "Movie" | "TV Shows" | "Anime";
  removeable?: boolean;
}

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export const Card = (p: CardProps) => {
  const releaseYear = p.release_date ? p.release_date.slice(0, 4) : "";
  console.log(p.poster_path);
  return (
    <article className="relative w-full">
      <figure className="!relative h-60 w-40">
        <Image
          src={getTMDBImgURL(p.poster_path)}
          alt={p.title}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={rgbDataURL(237, 181, 6)}
          className="!relative"
        />
      </figure>
      <h4 className="mt-1 text-sm font-title">{p.title}</h4>

      <div className="flex items-center justify-between">
        <span className="text-sm">{releaseYear}</span>
        <span className="text-sm">{p.type}</span>
      </div>

      <Link
        href={`/movies/${p.id}`}
        className="absolute inset-0 z-[1] opacity-0"
      >
        {p.title}
      </Link>

      {p.removeable && (
        <button
          onClick={() => removeFromFavourite(`${p.id}`)}
          className="absolute right-2 top-2 z-[2] flex h-5 w-5 items-center justify-center rounded-full bg-foreground p-1 text-background"
        >
          <DismissIcon />
        </button>
      )}
    </article>
  );
};
