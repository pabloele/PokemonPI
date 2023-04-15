import React from "react";
import style from "./LoginForm.module.css";
import { Link } from "react-router-dom";
export default function LoginForm() {
  return (
    <>
      <div className={style.loginMainContainer}>
        <div className={style.cover}>
          <h1>Welcome</h1>
          <input type="text" placeholder="username" className={style.input} />

          <input
            type="password"
            placeholder="password"
            className={style.input}
          />
          <div className={style.loginBtn}>Login</div>
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
