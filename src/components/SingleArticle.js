import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticle } from "../utils/api";
import { Card } from "grommet";
import Comments from "./Comments";
import ErrorPage from "./ErrorPage";

function SingleArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const [loadingSingleArticle, setLoadingSingleArticle] = useState(true);
  const [articleVoteError, setArticleVoteError] = useState(null);
  const [vote, setVote] = useState("Vote");
  const [error, setError] = useState(null);

  const { article_id } = useParams();
  const userValue = useContext(UserContext);

  useEffect(() => {
    setLoadingSingleArticle(true);
    getArticleById(article_id).then((retreivedArticle) => {
      setSingleArticle(retreivedArticle);
      setLoadingSingleArticle(false);
    }).catch((err) => {
      setError({ err })
    });
  }, [article_id]);

  function handleArticleVote(article_id, vote) {
    if (vote === "Vote" && userValue.user.username) {
      setSingleArticle({ ...singleArticle, votes: singleArticle.votes + 1 });
      setArticleVoteError(null);
      setVote("Unvote");
      patchArticle(article_id, vote).catch((err) => {
        setSingleArticle({ ...singleArticle, votes: singleArticle.votes - 1 });
        setArticleVoteError("Something went wrong, please try again.");
      });
    } else if (vote === "Unvote" && userValue.user.username) {
      setSingleArticle({ ...singleArticle, votes: singleArticle.votes - 1 });
      setArticleVoteError(null);
      setVote("Vote");
      patchArticle(article_id, vote).catch((err) => {
        setSingleArticle({ ...singleArticle, votes: singleArticle.votes + 1 });
        setArticleVoteError("Something went wrong, please try again.");
      });
    } else {
      alert("Please login to vote");
    }
  }

  if (articleVoteError) return <p>{articleVoteError}</p>;

  if (error) {
    return <ErrorPage message={error.err.message} response={error.err.response.data.msg}/>;
  }

  return loadingSingleArticle ? (
    <p>...loading article</p>
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
          onClick={() => {
            handleArticleVote(article_id, vote);
          }}
        >
          {vote}
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
