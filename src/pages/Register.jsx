import { useState } from "react";
import axios from "axios";
import URL from "../url";
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
      <h2>Register</h2>
      <label>username:</label>
      <input
        className={css.username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="enter your username"
      />
      <br />
      <label>email:</label>
      <input
        className={css.email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="enter your email"
      />
      <br />
      <label>password:</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="enter your password"
      />
      <br />
      <button onClick={handleRegister}>register</button>
      {error && <h3>something went wrong</h3>}
    </div>
  );
};

export default Register;
