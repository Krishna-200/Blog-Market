import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import URL from "../url";
import axios from "axios";
import { UserContext } from "../context/userContext";
import css from "../styles/login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      // console.log("login sucessfull");
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className={css.container}>
      <h2>Login</h2>
      <label>email your address:</label>
      <input
        className={css.email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="enter your email"
      />
      <br />
      <label>Enter your password:</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="enter your password"
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      {error && <h3>something went wrong</h3>}
    </div>
  );
};

export default Login;
