import { useState } from "react";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  async function searchMovies(e) {
    e.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch === "") {
      setMovies([]);
      setMessage("Please enter a movie title.");
      return;
    }

    const token = import.meta.env.VITE_TMDB_TOKEN;

    if (!token) {
      setMovies([]);
      setMessage("TMDB token is missing. Check your .env file.");
      return;
    }

    try {
      setMovies([]);
      setMessage("Searching...");

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          trimmedSearch
        )}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Movie search failed with status ${response.status}.`);
      }

      const data = await response.json();
      const results = Array.isArray(data.results) ? data.results : [];

      setMovies(results);
      setMessage(results.length === 0 ? "No movies found." : "");
    } catch (error) {
      setMovies([]);
      setMessage("There was an error connecting to TMDB. Check your token and internet connection.");
      console.error(error);
    }
  }

  return (
    <main className="page">
      <section className="hero-text">
        <h1>Movie Search</h1>
        <p>Search TMDB for movie information.</p>
      </section>

      <form onSubmit={searchMovies} className="form">
        <label htmlFor="movie-search">Search Movies</label>

        <input
          id="movie-search"
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {message && (
        <p className="empty-message" role="status">
          {message}
        </p>
      )}

      <section className="cards" aria-label="Movie search results">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            ) : (
              <div className="no-poster">No Poster</div>
            )}

            <h3>{movie.title}</h3>

            <p>
              <strong>Release:</strong>{" "}
              {movie.release_date ? movie.release_date : "Unknown"}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>

            <p>{movie.overview ? movie.overview : "No description available."}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MovieSearch;