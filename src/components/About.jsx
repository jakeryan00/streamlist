function About() {
  return (
    <main className="page">
      <section className="hero-text">
        <h1>About StreamList</h1>

        <p>
          StreamList is a Progressive Web Application developed for the
          EZTechMovie project. The purpose of the application is to provide
          users with a centralized location to browse movie subscriptions,
          search for movies, manage a personal watch list, and organize
          streaming content.
        </p>

        <br />

        <p>
          Throughout this project, modern web technologies including React,
          React Router, JavaScript, Local Storage, and the TMDB API were used
          to create an interactive user experience. The final version also
          incorporates Progressive Web App technologies, allowing the
          application to be installed on desktop devices while providing faster
          loading through cached resources.
        </p>

        <br />

        <h2>Features</h2>

        <ul
          style={{
            textAlign: "left",
            maxWidth: "700px",
            margin: "20px auto",
            lineHeight: "2",
          }}
        >
          <li>Browse streaming subscriptions</li>
          <li>Search movies using the TMDB API</li>
          <li>Create and manage a personal StreamList</li>
          <li>Shopping cart for subscription services</li>
          <li>Persistent Local Storage</li>
          <li>Responsive design</li>
          <li>Progressive Web App support</li>
        </ul>

        <h2>Future Enhancements</h2>

        <p>
          Future versions of StreamList may include secure user accounts,
          OAuth authentication, online payment processing, cloud database
          storage, personalized recommendations, and push notifications.
        </p>
      </section>
    </main>
  );
}

export default About;