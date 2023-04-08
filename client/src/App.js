import { Detail, Form, Landing, Home, About } from "./views";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
//import "./App.css";

function App() {
  console.log(process.env);
  const location = useLocation();

  const [userAut, setUserAut] = useState({
    email: "",
    password: "",
    registerEmail: "",
    registerPassword: "",
  });

  const handleChange = (e) => {
    setUserAut({
      ...userAut,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userAut.registerEmail,
        userAut.registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = () => {};

  const logout = () => {};

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <div className="App">
        {/* TODO: Implement NavBar component */}
        <div>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={userAut.email}
            onChange={handleChange}
            name="email"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={userAut.password}
            onChange={handleChange}
            name="password"
          />
          <button onClick={login}>ingresar</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={userAut.registerEmail}
            onChange={handleChange}
            name="registerEmail"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={userAut.registerPassword}
            onChange={handleChange}
            name="registerPassword"
          />
          <button onClick={register}>crear usuario</button>
        </div>
      </div>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/home" render={() => <Home />} />
      <Route path="/detail/:id" component={Detail} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/about" component={About} />
    </div>
  );
}

export default App;
