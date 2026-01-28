import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "80px" }}>404</h1>
      <h2>Page Not Found 😢</h2>
      <p>
        The page you’re looking for is under construction.
      </p>
      <Link to="/">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;