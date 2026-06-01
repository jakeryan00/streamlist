import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>StreamList</h2>
      <div>
        <Link to="/">StreamList</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;