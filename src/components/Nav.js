import { Link } from "react-router-dom";

function Nav () {
  return (
    <nav className="Nav">
      <Link to="/">
        <p>All articles</p>
      </Link>
    </nav>
  );
};

export default Nav;