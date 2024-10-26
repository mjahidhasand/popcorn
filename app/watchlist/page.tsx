import { getWatchlistMovies } from "@/actions";
import { Card } from "@/components";

const Watchlist = async () => {
  const watchlist = await getWatchlistMovies();
  return (
    <main className="px-4 py-4 md:px-12">
      <h4 className="mb-3 font-title">Watchlist</h4>

      {watchlist.length === 0 && (
        <>
          <h2 style={{ color: "#ff6347" }}>
            Your watchlist is currently empty!
          </h2>
          <p style={{ fontSize: "18px", color: "#555" }}>
            {"📚 Add some movies to explore your cinematic journey! 🎬✨"}
          </p>
        </>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-4">
        {watchlist.map((list) => (
          <Card
            key={list.id}
            id={list.id}
            title={list.title}
            poster_path={list.poster_path}
            release_date={list.release_date}
            type="Movie"
            removeable
          />
        ))}
      </div>
    </main>
  );
};

export default Watchlist;
