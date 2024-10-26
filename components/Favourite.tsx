"use client";
import { addToFavourite, removeFromFavourite } from "@/actions";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { StarIcon, StartAddIcon } from "./icons";
import { useIsFavouriteMovie } from "@/hooks";

interface Props {
  id: string;
}

type FavouriteState = boolean;

export const AddToFavourite = ({ id }: Props) => {
  const { isFavourite, isLoading } = useIsFavouriteMovie(id);
  const [isFavourited, setIsFavourited] = useState(isFavourite);
  const [optimisticFavourites, addOptimisticFavourite] = useOptimistic(
    isFavourited,
    (_, newFavourite: FavouriteState) => newFavourite,
  );
  const transition = useTransition();

  useEffect(() => {
    setIsFavourited(isFavourite);
  }, [isFavourite]);

  const toggleFavourite = async () => {
    // Start optimistic update before making API calls
    const newFavouriteState = !isFavourited;
    addOptimisticFavourite(newFavouriteState);

    try {
      if (newFavouriteState) {
        // Add to favourites
        await addToFavourite(id);
      } else {
        // Remove from favourites
        await removeFromFavourite(id);
      }
      setIsFavourited(newFavouriteState); // Update the local state
    } catch {
      // Revert the optimistic state if the operation fails
      addOptimisticFavourite(isFavourited);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        transition[1](() => toggleFavourite());
      }}
    >
      {isLoading ? (
        <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
      ) : (
        <button type="submit">
          {optimisticFavourites ? <StarIcon /> : <StartAddIcon />}
        </button>
      )}
    </form>
  );
};
