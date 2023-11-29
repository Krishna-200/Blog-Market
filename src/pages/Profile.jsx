import { useContext, useEffect, useState } from "react";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import css from "../styles/Profile.module.css";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  // console.log(user)

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/user/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      // console.log(res.data)
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };
  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/user/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(user)
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      // console.log(res.data)
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div className={css.container}>
      <div className={css.posts}>
        <h1>Your posts:</h1>
        {posts?.map((p) => (
          <Link key={p._id} to={`/posts/post/${p._id}`}>
            <ProfilePosts key={p._id} p={p} />
          </Link>
        ))}
      </div>
      <div className={css.profile}>
        <h1>Profile</h1>
        <div>
          <span> UserName:</span>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Your username"
            type="text"
          />
        </div>
        <span> Email:</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Your email"
          type="email"
        />
        <div className={css.button}>
          <button onClick={handleUserUpdate}>Update</button>
          <button onClick={handleUserDelete}>Delete</button>
        </div>
        {updated && <h3>user updated successfully!</h3>}
      </div>
    </div>
  );
};

export default Profile;
