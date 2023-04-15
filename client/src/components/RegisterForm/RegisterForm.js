import React from "react";
import style from "./RegisterForm.module.css";

export default function RegisterForm() {
  return (
    <>
      <div className={style.loginMainContainer}>
        <div className={style.cover}>
          <h1></h1>
          <h1>New User </h1>
          <div className={style.inputsContainer}>
            <input type="text" placeholder="username" className={style.input} />
            <input type="text" placeholder="email" className={style.input} />

            <input
              type="password"
              placeholder="password"
              className={style.input}
            />
            <input
              type="password"
              placeholder="password confirmation"
              className={style.input}
            />
          </div>
          <div className={style.registerBtn}>Register</div>
        </div>
      </div>
    </>
  );
}
