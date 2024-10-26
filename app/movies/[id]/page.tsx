import { getCast, getMovie, getRecommendMovies } from "@/actions";
import { Card, CardProps } from "@/components";
import { AddToFavourite } from "@/components";
import { getTMDBImgURL } from "@/lib";

interface Genre {
  id: string;
  name: string;
}

interface Cast {
  name: string;
}

export const revalidate = 60;

const Movie = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const movie = await getMovie(id);
  const casts = await getCast(id);
  const movies = await getRecommendMovies(id);

  const posterImg = getTMDBImgURL(movie.poster_path);

  return (
    <main className="px-4 py-4 md:px-12">
      <div className="flex flex-col gap-4 md:flex-row">
        <img
          src={posterImg}
          alt={movie.title}
          className="h-80 w-full rounded-lg object-cover md:w-60"
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="w-fit rounded bg-foreground px-2 py-1 text-xs text-background">
              {movie.release_date}
            </span>
            <AddToFavourite id={id} />
          </div>
          <h1 className="text-4xl font-title">{movie.title}</h1>
          <p className="text-md text-foreground">{movie.overview}</p>
          <p className="flex gap-4">
            {movie.genres.map((genre: Genre) => (
              <span
                key={genre.id}
                className="w-fit rounded bg-foreground px-2 py-1 text-xs text-background"
              >
                {genre.name}
              </span>
            ))}
          </p>

          <div>
            <h4 className="text-sm font-title">Casts</h4>

            <p className="flex flex-wrap gap-1">
              {casts.map((cast: Cast, index) => (
                <span
                  key={index}
                  className="w-fit rounded bg-foreground px-2 py-1 text-xs text-background"
                >
                  {cast.name}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <h2 className="font-xl mb-2 mt-8 font-title">Recommended</h2>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-4">
        {movies?.map(({ id, title, poster_path, release_date }: CardProps) => (
          <Card
            key={id}
            id={id}
            title={title}
            poster_path={poster_path}
            release_date={release_date}
            type="Movie"
          />
        ))}
      </div>
    </main>
  );
};

export default Movie;
