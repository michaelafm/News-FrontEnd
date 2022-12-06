import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import { Card } from 'grommet';
import Comments from "./Comments";


function SingleArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const [loadingSingleArticle, setLoadingSingleArticle] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    setLoadingSingleArticle(true);
    getArticleById(article_id).then((retreivedArticle) => {
      setSingleArticle(retreivedArticle);
      setLoadingSingleArticle(false);
    });
  }, [article_id]);


  return loadingSingleArticle ? (
    <p>...loading articles</p>
  ) : (
    <main>

    <Card className="SingleArticle" pad="medium">
        <h3>{singleArticle.title}</h3>
        <p>{singleArticle.body}</p>
        <p>Written by: {singleArticle.author} </p>
        <p>Topic: {singleArticle.topic}</p>
        <p>Created: {new Date(singleArticle.created_at).toGMTString()}</p>
        <p>Votes: {singleArticle.votes}</p>
        <button
              id="SingleArticle_votes_voteButton"
              type="button"
              onClick={() => {}}
            >
              Vote
            </button>
        <p>Total comments: {singleArticle.comment_count}</p>
      </Card>
      <Card>
      <Comments />
    </Card>
    </main>

  );
}

export default SingleArticle;
