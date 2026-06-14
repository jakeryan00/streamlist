import { useState } from "react";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  async function searchMovies(e) {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      setMessage("Please enter a movie title.");
      return;
    }

    try {
      setMessage("Searching...");

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchTerm
        )}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Movie search failed.");
      }

      const data = await response.json();
      setMovies(data.results);
      setMessage(data.results.length === 0 ? "No movies found." : "");
      setSearchTerm("");
    } catch (error) {
      setMessage("There was an error connecting to TMDB.");
      console.error(error);
    }
  }

  return (
    <main className="page">
      <h1>Movie Search</h1>
      <p>Search TMDB for movie information.</p>

      <form onSubmit={searchMovies} className="form">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {message && <p className="empty-message">{message}</p>}

      <section className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
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
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <p>{movie.overview ? movie.overview : "No description available."}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default MovieSearch;