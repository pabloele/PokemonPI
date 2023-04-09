import { Detail, Form, Landing, Home, About } from "./views";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, uploadFile } from "./firebase-config";

//import "./App.css";

function App() {
  const location = useLocation();

  const [userAut, setUserAut] = useState({
    email: "",
    password: "",
    registerEmail: "",
    registerPassword: "",
  });

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const handleChange = (e) => {
    setUserAut({
      ...userAut,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile(file);
  };
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        userAut.registerEmail,
        userAut.registerPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, userAut.email, userAut.password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const [file, setFile] = useState(null);
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <div className="App">
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

        <div>User logged in: {user?.email}</div>
        <button onClick={logout}>sign out</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="archivo"
          id=""
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button>Upload</button>
      </form>

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
