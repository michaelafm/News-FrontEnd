import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopics } from "../utils/api";

function Nav() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <nav className="Nav">
      <ul className="Nav_list">
        <li>
          <Link to="/">
            <p>All articles</p>
          </Link>
        </li>
        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <Link to={`/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
        <li>
          <Link to="/users">
            <p>Users</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
