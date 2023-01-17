import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { getUsers } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Card } from "grommet";
import Button from "react-bootstrap/Button";
import LoadingAnimation from "./LoadingAnimation";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { login } = useContext(UserContext);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingUsers(true);
    getUsers().then((retreivedUsers) => {
      setUsers(retreivedUsers);
      setLoadingUsers(false);
    });
  }, []);

  function handleLogin(user) {
    login(user);
    navigate(-1);
  }

  return loadingUsers ? (
    <LoadingAnimation />
  ) : (
    <main className="Users">
      <h1>Users</h1>
      <ul className="Users_list_container">
        {users.map((user) => {
          return (
            <Card pad="medium" key={user.username}>
              <li className="Users_Card">
                <h3>{user.username}</h3>
                <img
                  className="Users_user_avatar"
                  src={user.avatar_url}
                  alt={`portrait of ${user.username}`}
                ></img>

                <Button variant="dark" onClick={() => handleLogin(user)}>
                  Login as this user
                </Button>
              </li>
            </Card>
          );
        })}
      </ul>
    </main>
  );
};

export default Users;
