import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";



function App() {
  const [articles, setArticles] = useState([]);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes> 
        <Route
            path="/"
            element={ <Articles articles={articles} setArticles={setArticles}/>}
          />
           <Route
            path="/article/:article_id"
            element={<SingleArticle />}
          />
      </Routes>
    </div>
  );
}

export default App;
