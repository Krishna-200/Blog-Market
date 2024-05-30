import { Link, useLocation, useNavigate } from "react-router-dom";
import css from "../styles/Navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import URL from "../url";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  // console.log(prompt);
  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={css.container}>
      {/* <hr /> */}
      <Link to="/" className={css.heading}>
        <h2>DAILY ARTICLES</h2>
      </Link>
      {path === "/" && (
        <div className={css.search}>
          <FaSearch />
          <input
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="search a post"
          />
          {/* <div
            onClick={() => navigate("?search=" + prompt)}
            className={css.searchButton}
          >
            <FaSearch /> Search
          </div> */}
        </div>
      )}
      <div className={css.links}>
        <Link to="/allposts">All Posts</Link>
        <Link>About Us</Link>
        {user ? <Link to="/write">Write</Link> : <Link to="/login">Login</Link>}
        {user ? (
          <Link to="/profile/:id">Profile</Link>
        ) : (
          <Link to="/register">Register</Link>
        )}
        {user ? <h4 onClick={handleLogout}>Logout</h4> : null}
      </div>
    </div>
  );
};

export default Navbar;
