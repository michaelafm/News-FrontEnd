import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function UserIcon() {
  const userValue = useContext(UserContext);

  return userValue.user.username ? (
    <main>
      <div className="UserIcon_container">
        <p>Logged in as {userValue.user.username}</p>
        <img
          className="UserIcon_img"
          src={userValue.user.avatar_url}
          alt={`user icon of ${userValue.user.username}`}
        ></img>
        <Button
          variant="outline-dark"
          onClick={() => {
            userValue.logout();
          }}
        >
          Log-out
        </Button>
      </div>
    </main>
  ) : (
    <div className="UserIcon_login">
      <Link to="/users">
        <p>Log in</p>
      </Link>
    </div>
  );
}

export default UserIcon;
