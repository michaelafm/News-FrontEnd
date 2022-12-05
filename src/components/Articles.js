import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    getArticles().then((retreivedArticles) => {
      setArticles(retreivedArticles);
      setLoadingArticles(false);
    });
  }, []);

  return loadingArticles ? (
    <p>...loading articles</p>
  ) : (
    <main>
      <ul className="Articles_container">
        {articles.map((article) => {
          return (
            <Link
              key={article.article_id}
              to={`/article/${article.article_id}`}
            >
              <li
                className="Articles_container_article"
                key={article.article_id}
              >
                <h3>Title: {article.title}</h3>
                <p>Author: {article.author}</p>
                <p>Created: {new Date(article.created_at).toGMTString()}</p>
                <p>Votes: {article.votes}</p>
                <p>Comment count: {article.comment_count}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default Articles;
