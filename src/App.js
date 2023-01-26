import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import Users from "./components/Users";
import { Grommet, Box, CheckBox } from "grommet";
import { grommet } from "grommet";
import { useState } from "react";
import ErrorPage from "./components/ErrorPage";
import Navigation from "./navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./contexts/User";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Grommet
      className="App"
      full
      theme={grommet}
      themeMode={darkMode ? "dark" : "light"}
    >
      <UserProvider>
        <Box pad="large">
          <Navigation />
          <div className="App_theme-container">
            <CheckBox
              label={darkMode ? "Light Mode" : "Dark Mode"}
              checked={darkMode}
              onChange={(event) => setDarkMode(event.target.checked)}
              toggle
            />
          </div>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/article/:article_id" element={<SingleArticle />} />
            <Route path="/users" element={<Users />} />
            <Route path="/articles/:topic" element={<Articles />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
      </UserProvider>
    </Grommet>
  );
}

export default App;
