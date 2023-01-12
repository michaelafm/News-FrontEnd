import { Navbar, Nav, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" as={Link} to="/">
          <h1>NC News</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" as={Link} to="/">
              <h4>All articles</h4>
            </Nav.Link>
            {topics.map((topic) => {
              return (
                <Nav.Link
                  key={topic.slug}
                  href={`/articles/${topic.slug}`}
                  as={Link}
                  to={`/articles/${topic.slug}`}
                  className="Navigation_link"
                >
                  <h4>{topic.slug}</h4>
                </Nav.Link>
              );
            })}
            <Nav.Link
              href="/users"
              as={Link}
              to="/users"
              className="Navigation_link"
            >
              <h4>Users</h4>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
