import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

function UserIcon() {
  const userValue = useContext(UserContext);

  return userValue.user.username ? (
    <main>
      <p>Logged in as {userValue.user.username}</p>
      <img
        className="User_login_icon"
        src={userValue.user.avatar_url}
        alt={`user icon of ${userValue.user.username}`}
      ></img>
      <br />
      <button
        id="orderButton"
        type="button"
        onClick={() => {
          userValue.logout();
        }}
      >
        Log-out
      </button>
    </main>
  ) : (
    <Link to="/users">
      <p>Please log in</p>
    </Link>
  );
}

export default UserIcon;
