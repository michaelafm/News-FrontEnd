import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import Users from "./components/Users";
import UserIcon from "./components/UserIcon";
import { Grommet, Box, CheckBox } from "grommet";
import { grommet } from "grommet";
import { useState } from "react";
import { UserProvider } from "./contexts/User";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <UserProvider>
      <Grommet
        className="App"
        full
        theme={grommet}
        themeMode={darkMode ? "dark" : "light"}
      >
        <Box pad="large">
          <div className="Header_container">
          <Header />
          <CheckBox
            label={darkMode ? "Light Mode" : "Dark Mode"}
            checked={darkMode}
            onChange={(event) => setDarkMode(event.target.checked)}
            toggle
          />
          <UserIcon />
          </div>
          <Nav />
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/article/:article_id" element={<SingleArticle />} />
            <Route path="/users" element={<Users />} />
            <Route path="/:topic" element={<Articles />} />
          </Routes>
        </Box>
      </Grommet>
    </UserProvider>
  );
}

export default App;
