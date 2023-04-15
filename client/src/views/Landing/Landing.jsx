import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getQuery, getTipos, saveFilters } from "../../redux/actions";

const Landing = () => {
  //DISPATCHEA LOS TIPOS AL ESTADO GLOBAL DE REDUX PARA USARLOS MÁS ADELANTE
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTipos());
    dispatch(saveFilters(1, "asc", "", "name", "existente"));
    dispatch(getQuery(""));
  }, [dispatch]);

  return (
    <div className={style.mainLanding}>
      {/* <input type="text" placeholder="Nombre de usuario" />
      <input type="password" placeholder="Contraseña" /> */}
      {/* <button onClick={handleLogin}>Iniciar sesión</button> */}

      <Link to="/login">
        <button>INGRESAR A LA APP</button>
      </Link>
    </div>
  );
};

export default Landing;
