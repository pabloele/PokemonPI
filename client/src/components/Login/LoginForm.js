import React from "react";
import style from "./LoginForm.module.css";
import { Link, useHistory } from "react-router-dom";
import { useUserAuth } from "../../context/authContext";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };
  const { login, googleSignIn } = useUserAuth();
  const handleLogin = async () => {
    setError("");
    try {
      const loginResponse = await login(userForm.email, userForm.password);
      //console.log(loginResponse);
      history.push("/home");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  const handlelogInWithGoogle = async () => {
    try {
      const response = await googleSignIn();
      console.log("UID:", response.user.uid, "email:", response.user.email);
      await axios.post("http://localhost:3001/users", {
        uid: response.user.uid,
        email: response.user.email,
      });
      history.push("/home");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className={style.loginMainContainer}>
        <div className={style.cover}>
          <h1>Welcome</h1>
          {error ? <div className={style.error}>{error}</div> : null}
          <input
            type="text"
            placeholder="email"
            name="email"
            value={userForm.email}
            onChange={handleChange}
            className={style.input}
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
            className={style.input}
          />
          <div className={style.loginBtn} onClick={handleLogin}>
            Login
          </div>
          <p className={style.text}>Or login using</p>
          <div className={style.altLogin}>
            <div className={style.facebook}></div>
            <div className={style.google} onClick={handlelogInWithGoogle}></div>
            <div className={style.github}></div>
          </div>
          <p className={style.text}>Not a member? </p>
          <div className={style.registerBtn}>
            <Link to="/register" className={style.link}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
