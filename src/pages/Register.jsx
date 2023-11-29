import { useState } from "react";
import axios from "axios";
import URL from "../url";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import css from "../styles/login.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
      // console.log(res.data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.loginForm}>
        <h2>Register</h2>
        <div>
          <label>username:</label>
          <input
            className={css.input}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </div>
        <div className={css.child}>
          <label>email:</label>
          <input
            className={css.input}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>password:</label>
          <input
            className={css.input}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className={css.button}>
          <button onClick={handleRegister}>Register</button>
          <p>
            already have an account! <Link to="/login"> login here </Link>
          </p>
        </div>
        {error && <h3>something went wrong</h3>}
      </div>
    </div>
  );
};

export default Register;
