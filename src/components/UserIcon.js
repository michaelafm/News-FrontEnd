import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Anchor } from "grommet";

function UserIcon() {
  const userValue = useContext(UserContext);

  return userValue.user.username ? (
    <div className="UserIcon_container">
      <div className="UserIcon_holder">
        <img
          className="UserIcon_img"
          src={userValue.user.avatar_url}
          alt={`user icon of ${userValue.user.username}`}
        ></img>
      </div>
      <p>{userValue.user.username}</p>
      <div className="UserIcon_buttonContainer">
        <Button
          size="sm"
          variant="outline-light"
          onClick={() => {
            userValue.logout();
          }}
        >
          Log-out
        </Button>
      </div>
    </div>
  ) : (
    <div className="UserIcon_container">
      <div className="UserIcon_login">
      <Anchor as={Link} to="/users" className="login-link">
        <p>Log in</p>
      </Anchor>
      </div>
    </div>
  );
}

export default UserIcon;
