import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { getUsers } from "../utils/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    setLoadingUsers(true);
    getUsers().then((retreivedUsers) => {
      setUsers(retreivedUsers);
      setLoadingUsers(false);
    });
  }, []);

  return loadingUsers ? (
    <p>...loading users</p>
  ) : (
    <main className="Users">
      <h1>Users</h1>
      <ul className="Users_list">
        {users.map((user) => {
          return (
            <li className="Users_Card" key={user.username}>
              <h3>{user.username}</h3>
              <img
                className="Users_user_avatar"
                src={user.avatar_url}
                alt={`portrait of ${user.username}`}
              ></img>
              <br />
              <button onClick={() => setUser(user)}>Login as this user</button>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Users;