import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getComments, deleteCommentById } from "../utils/api";
import CommentAdder from "./CommentAdder";
import { UserContext } from "../contexts/User";
import { Button } from "react-bootstrap";
import { Card } from "grommet";
import LoadingAnimation from "./LoadingAnimation";

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
    <LoadingAnimation />
  ) : (
    <div className="Comments">
      <CommentAdder
        setComments={setComments}
        article_id={article_id}
        setDeletedComment={setDeletedComment}
      />
      {deletingComment ? <p className="Comments_commentStatus">...deleting comment</p> : null}
      {deletedComment ? <p className="Comments_commentStatus">Your comment has been deleted</p> : null}
      <h3 className="Comments_header">Comments</h3>
      <ul className="Comments">
        {comments.map((comment) => {
          return (
            <div className="Comments_comment_card" key={comment.comment_id}>
            <Card >
            <li  className="Comments_comment">
              <h4>{comment.author}</h4>
              <p>{comment.body}</p>
              <p>Created: {new Date(comment.created_at).toGMTString()}</p>
              <p>Votes: {comment.votes}</p>
              <div className="Comments_comment_button_container">
              <Button
                variant="dark"
                onClick={() => {}}
              >
                Vote
              </Button>
              {userValue.user.username === comment.author && deletingComment === false ? (
                <Button
                  variant="danger"
                  onClick={() => {
                    removeOnClick(comment.comment_id);
                  }}
                >
                  Delete comment
                </Button>
              ) : null}
              </div>
            </li>
            </Card>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Comments;
