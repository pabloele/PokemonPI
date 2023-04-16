import React from "react";
import style from "./RegisterForm.module.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../../context/authContext";
export default function RegisterForm() {
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    setError("");
    try {
      const createdUser = await signUp(newUser.email, newUser.password);
      console.log(createdUser);
      history.push("/home");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  const { signUp } = useUserAuth();
  return (
    <>
      <div className={style.loginMainContainer}>
        <div className={style.cover}>
          <h1></h1>
          <h1>New User </h1>
          {error ? (
            <div className={style.error}>email or password wrong</div>
          ) : null}
          <div className={style.inputsContainer}>
            <input
              type="text"
              placeholder="Username"
              className={style.input}
              name="name"
              value={newUser.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="email"
              name="email"
              className={style.input}
              value={newUser.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="password"
              className={style.input}
              name="password"
              value={newUser.password}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password confirmation"
              className={style.input}
              name="passwordConfirmation"
              value={newUser.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          {/* <Link to="/home" className={style.link}> */}
          <div className={style.registerBtn} onClick={handleSubmit}>
            Register
          </div>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}
