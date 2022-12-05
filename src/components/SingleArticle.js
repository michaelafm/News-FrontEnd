import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";

function SingleArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const [loadingSingleArticle, setLoadingSingleArticle] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((retreivedArticle) => {
      setSingleArticle(retreivedArticle);
      setLoadingSingleArticle(false);
    });
  }, [article_id]);

  return loadingSingleArticle ? (
    <p>...loading articles</p>
  ) : (
    <main>
      <div className="SingleArticle">
        <h3>{singleArticle.title}</h3>
        <p>{singleArticle.body}</p>
        <p>Written by: {singleArticle.author} </p>
        <p>Topic: {singleArticle.topic}</p>
        <p>Created: {new Date(singleArticle.created_at).toGMTString()}</p>
        <p>Votes: {singleArticle.votes}</p>
        <p>Comment count: {singleArticle.comment_count}</p>
      </div>
    </main>
  );
}

export default SingleArticle;
