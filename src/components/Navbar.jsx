import { NavLink } from "react-router-dom";

function Navbar({ setUser }) {
  function handleLogout() {
    localStorage.removeItem("eztechUser");
    setUser(null);
  }

  return (
    <nav className="navbar">
      <h2 className="brand">StreamList</h2>

      <ul className="nav-links">
        <li>
          <NavLink to="/">StreamList</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/movie-search">Movie Search</NavLink>
        </li>
        <li>
          <NavLink to="/subscriptions">Subscriptions</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;