import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import axios from "axios";
import { URL } from "../url";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/userContext";
import css from "../styles/HeroPosts.module.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const { search } = useLocation();
  // console.log(search);
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts" + search);

      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
      // console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Navbar />
      {loader ? (
        <Loader />
      ) : !noResults ? (
        posts.map((post) => (
          <Link
            className={css.info}
            key={post._id}
            to={user ? `/posts/post/${post._id}` : "/login"}
          >
            <HomePosts post={post} />
          </Link>
        ))
      ) : (
        <h3>No posts available</h3>
      )}
    </div>
  );
};

export default Home;
