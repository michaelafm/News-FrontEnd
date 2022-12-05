import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../utils/api";

function Comments() {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    getComments(article_id).then((retreivedComments) => {
      setComments(retreivedComments);
      setLoadingComments(false);
    });
  }, [article_id]);

  return loadingComments ? (
    <p>...loading comments</p>
  ) : (
    <ul className="Comments">
      {comments.map((comment) => {
        return (
          <li key={comment.comment_id} className="Comments_comment">
            <h3>{comment.author}</h3>
            <p>{comment.article_id}</p>
            <p>{comment.body}</p>
            <p>Created: {new Date(comment.created_at).toGMTString()}</p>
            <p>Votes: {comment.votes}</p>
            <button
              id="Comments_comment_voteButton"
              type="button"
              onClick={() => {}}
            >
              Vote
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
