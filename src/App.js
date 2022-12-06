import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import Users from "./components/Users";
import UserIcon from "./components/UserIcon";
import { Grommet, Box, Button } from "grommet";
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
        <Header />
        <UserIcon />
        <Button
          label="Toggle Theme"
          primaryalignSelf="center"
          margin="small"
          onClick={() => setDarkMode(!darkMode)}
        />
        <Nav />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/article/:article_id" element={<SingleArticle />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Box>
    </Grommet>
    </UserProvider>
  );
}

export default App;
