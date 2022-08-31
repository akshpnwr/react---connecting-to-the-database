import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://swapi.py4e.com/api/films/`);

      if (!res.ok) throw new Error("Something went wrong!");

      const { results } = await res.json();

      const transformedMovies = results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });

      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("effect");
    fetchMoviesHandler();

    return () => {
      console.log("clean up");
    };
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;

  if (error) content = <p>{error}</p>;

  if (isLoading) content = <p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
