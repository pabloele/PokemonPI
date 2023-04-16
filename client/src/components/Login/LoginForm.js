import React from "react";
import style from "./LoginForm.module.css";
import { Link, useHistory } from "react-router-dom";
import { useUserAuth } from "../../context/authContext";
import { useState } from "react";

export default function LoginForm() {
  const history = useHistory();
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
  const { login } = useUserAuth();
  const handleLogin = async () => {
    try {
      const loginResponse = await login(userForm.email, userForm.password);
      //console.log(loginResponse);
      history.push("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className={style.loginMainContainer}>
        <div className={style.cover}>
          <h1>Welcome</h1>
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
            <div className={style.google}></div>
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
