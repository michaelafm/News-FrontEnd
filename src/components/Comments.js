import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getComments, deleteCommentById } from "../utils/api";
import CommentAdder from "./CommentAdder";
import { UserContext } from "../contexts/User";

function Comments() {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [deletedComment, setDeletedComment] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);
  const userValue = useContext(UserContext);
  const [comment_id, setCommentId] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    setLoadingComments(true);
    getComments(article_id).then((retreivedComments) => {
      setComments(retreivedComments);
      setLoadingComments(false);
    });
  }, [article_id, comment_id]);

  function removeOnClick(selectedComment) {
    setDeletingComment(true);
    deleteCommentById(selectedComment).then(() => {
      setDeletedComment(true);
      setDeletingComment(false);
      setCommentId(selectedComment);
    });
  }

  return loadingComments ? (
    <p>...loading comments</p>
  ) : (
    <div className="Comments">
      <CommentAdder
        setComments={setComments}
        article_id={article_id}
        setDeletedComment={setDeletedComment}
      />
      {deletingComment ? <p>...deleting comment</p> : null}
      {deletedComment ? <p>Your comment has been deleted</p> : null}
      <h3>Comments</h3>
      <ul className="Comments">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="Comments_comment">
              <h4>{comment.author}</h4>
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
              <br />
              {userValue.user.username === comment.author && deletingComment === false ? (
                <button
                  id="Comments_comment_deleteButton"
                  type="button"
                  onClick={() => {
                    removeOnClick(comment.comment_id);
                  }}
                >
                  Delete comment
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Comments;
