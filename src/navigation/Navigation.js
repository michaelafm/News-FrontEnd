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
    <div className="Navigation_container">

      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="gap-3px-3"
        fixed="top"
      >

          <Container>
            <div className="Navigation_logo">
            <Navbar.Brand href="/" as={Link} to="/">
              <img
                src={require("../images/NCNewsLogo.jpg")}
                width="100%"
                alt="NC-News logo"
              />
            </Navbar.Brand>
            </div>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="flex-grow-1 justify-content-evenly">
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
      </div>

  );
};

export default Navigation;
