import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Card } from "grommet";
import SortByQuery from "./SortByQuery";
import ErrorPage from "./ErrorPage";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const { topic } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);


  let sort_by = searchParams.get("sort_by");
  let order = searchParams.get("order");

  useEffect(() => {
    setError(null);
    setLoadingArticles(true);
    getArticles(sort_by, order, topic).then((retreivedArticles) => {
      setArticles(retreivedArticles);
      setLoadingArticles(false);
    }).catch((err) => {
      setError({ err })
    })
  }, [sort_by, order, topic]);

  if (error) {
    return <ErrorPage message={error.err.message} response={error.err.response.data.msg}/>;
  }

  return (
    <main>
      <SortByQuery
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      {loadingArticles ? (
        <p>...loading articles</p>
      ) : (
        <div className="Articles">
          {topic ? <h2>{topic} articles</h2> : null}
          <ul className="Articles_container">
            {articles.map((article) => {
              return (
                <Link
                  key={article.article_id}
                  to={`/article/${article.article_id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card className="Articles_card_article" pad="medium">
                    <li className="Articles_article" key={article.article_id}>
                      <h3>Title: {article.title}</h3>
                      <p>Author: {article.author}</p>
                      <p>
                        Created: {new Date(article.created_at).toGMTString()}
                      </p>
                      <p>Topic: {article.topic}</p>
                      <p>Votes: {article.votes}</p>
                      <p>Comment count: {article.comment_count}</p>
                    </li>
                  </Card>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </main>
  )
}

export default Articles;
