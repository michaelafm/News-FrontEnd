import { useState, useContext } from "react";
import { postComment } from "../utils/api";
import { UserContext } from "../contexts/User";
import { Button } from "react-bootstrap";
import { Anchor } from "grommet";
import { Link } from "react-router-dom";

function CommentAdder({ setComments, article_id, setDeletedComment }) {
  const userValue = useContext(UserContext);
  const [newComment, setNewComment] = useState({
    username: userValue.user.username,
    body: "",
  });
  const [postingComment, setPostingComment] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [commentEmpty, setCommentEmpty] = useState(false);

  const handleSubmit = (e) => {
    setCommentEmpty(false);
    e.preventDefault();
    if (!newComment.body.length) {
      setCommentEmpty(true);
      return;
    } else {
      setPostingComment(true);
      postComment(newComment, article_id).then((commentFromApi) => {
        setNewComment({ ...newComment, body: "" });
        setComments((currComments) => {
          const newComments = [...currComments];
          newComments.unshift(commentFromApi);
          return newComments;
        });
        setPostingComment(false);
        setDeletedComment(false);
        setCommentStatus(true);
      });
    }
  };

  return postingComment ? (
    <p className="Comments_commentStatus">...posting comment</p>
  ) : (
    <div className="CommentAdder">
      <form className="CommentAdder_form" onSubmit={handleSubmit}>
        <label htmlFor="newComment">Add a comment</label>
        <textarea
          id="CommentAdder_newComment"
          value={newComment.body}
          onChange={(e) =>
            setNewComment({ ...newComment, body: e.target.value })
          }
        ></textarea>
        {commentEmpty ? (
          <p className="CommentAdder_error">Please add text to comment</p>
        ) : null}
        {userValue.user.username ? (
          <Button variant="dark" onClick={handleSubmit}>
            Add
          </Button>
        ) : (
          <Anchor href="/users" className="login-link" as={Link} to="/users">
            <p className="CommentAdder_error">Log in to comment</p>
          </Anchor>
        )}
      </form>
      {commentStatus ? <p className="Comments_commentStatus">Your comment has been posted!</p> : null}
    </div>
  );
}

export default CommentAdder;
