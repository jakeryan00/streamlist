import { useState } from "react";

function StreamList() {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("User added:", title);
    setTitle("");
  }

  return (
    <main className="page">
      <h1>My StreamList</h1>
      <p>Add a movie or show you want to watch later.</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter movie or show title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add to StreamList</button>
      </form>
    </main>
  );
}

export default StreamList;