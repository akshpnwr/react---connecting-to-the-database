import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const res = await fetch(`https://swapi.py4e.com/api/films/`);

    if (!res.ok) return;

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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
