import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import { Grommet, Box, Button } from "grommet";
import { grommet } from "grommet";
import {useState} from "react";



function App() {
const [darkMode, setDarkMode] = useState(false);
  return (
    <Grommet className="App" full theme={grommet} themeMode={darkMode ? "dark" : "light"}>
    <Box pad="large">
      <Header />
      <Button
        label="Toggle Theme"
        primaryalignSelf="center"
        margin="small"
        onClick={() => setDarkMode(!darkMode)} />
      <Nav />
      <Routes> 
        <Route
            path="/"
            element={ <Articles />}
          />
           <Route
            path="/article/:article_id"
            element={<SingleArticle />}
          />
      </Routes>
    </Box>
    </Grommet>
  );
}

export default App;
