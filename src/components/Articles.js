import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { Card } from "grommet";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const { topic } = useParams();

  useEffect(() => {
    setLoadingArticles(true);
    getArticles(topic).then((retreivedArticles) => {
      setArticles(retreivedArticles);
      setLoadingArticles(false);
    });
  }, [topic]);

  return loadingArticles ? (
    <p>...loading articles</p>
  ) : (
    <main>
      {topic ? <h2>{topic} articles</h2> : null}
      <ul className="Articles_container">
        {articles.map((article) => {
          return (
            <Link
              key={article.article_id}
              to={`/article/${article.article_id}`}
            >
              <Card className="Articles_card_article" pad="medium">
                <li className="Articles_article" key={article.article_id}>
                  <h3>Title: {article.title}</h3>
                  <p>Author: {article.author}</p>
                  <p>Created: {new Date(article.created_at).toGMTString()}</p>
                  <p>Topic: {article.topic}</p>
                  <p>Votes: {article.votes}</p>
                  <p>Comment count: {article.comment_count}</p>
                </li>
              </Card>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default Articles;
