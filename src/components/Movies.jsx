import heroImage from "../assets/hero.png";

function Movies() {
  const featuredMovies = [
    {
      id: 1,
      title: "The Matrix",
      genre: "Science Fiction",
      rating: "R",
      description: "A hacker discovers that reality is not what it seems.",
    },
    {
      id: 2,
      title: "Spider-Man: Into the Spider-Verse",
      genre: "Animation / Action",
      rating: "PG",
      description: "Miles Morales becomes Spider-Man and joins heroes from other dimensions.",
    },
    {
      id: 3,
      title: "Black Panther",
      genre: "Action / Adventure",
      rating: "PG-13",
      description: "A new king protects Wakanda while facing a powerful challenger.",
    },
    {
      id: 4,
      title: "Interstellar",
      genre: "Science Fiction / Drama",
      rating: "PG-13",
      description: "A team of explorers travels through space to find humanity a new home.",
    },
  ];

  return (
    <main className="page">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Movies</h1>
          <p>
            Browse featured movies available through EZTechMovie streaming
            services. Customers can review movie options before adding titles
            to their personal StreamList.
          </p>
        </div>

        <img src={heroImage} alt="Streaming entertainment preview" className="hero-image" />
      </section>

      <section className="movie-grid" aria-labelledby="featured-movies-heading">
        <h2 id="featured-movies-heading">Featured Movies</h2>

        <div className="cards">
          {featuredMovies.map((movie) => (
            <article className="movie-card" key={movie.id}>
              <h3>{movie.title}</h3>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
              <p>{movie.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Movies;