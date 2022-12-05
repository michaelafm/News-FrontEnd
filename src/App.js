import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";


function App() {
  const [articles, setArticles] = useState([]);

  return (
    <div className="App">
      <Header />
      <Routes> 
        <Route
            path="/"
            element={ <Articles articles={articles} setArticles={setArticles}/>}
          />
      </Routes>
    </div>
  );
}

export default App;
