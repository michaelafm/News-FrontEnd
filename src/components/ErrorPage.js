import { Link } from "react-router-dom";

function ErrorPage({ message, response }) {
  if (message) {
    return (
      <div>
        <h3>
          {message}: {response}
        </h3>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h3>Request failed with status code 404: Route not found</h3>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default ErrorPage;
