import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import URL from "../url";
import axios from "axios";
import { Link } from "react-router-dom";
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
      <div className={css.loginForm}>
        <h2>Login</h2>
        <div className={css.child}>
          <label className={css.inputLlabel}>email:</label>
          <input
            className={css.input}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label className={css.inputLabel}>password:</label>
          <input
            className={css.input}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <h4>Forgot your password ?</h4>
        </div>
        <div className={css.button}>
          <button onClick={handleLogin}>Login</button>
          <p>
            new here! create your account{" "}
            <Link to="/register"> register now </Link>
          </p>
        </div>
        {error && <h3>something went wrong</h3>}
      </div>
    </div>
  );
};

export default Login;
