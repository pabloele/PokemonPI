import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../resources/img/logo.png";
import { addPokes, getPokes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const NavBar = () => {
  const {
    Pokemones: Pokemons,
    FiltrosYOrden,
    Tipos: Types,
    Query,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const agregarMas = async (i) => {
    if (i < 600) {
      try {
        await dispatch(addPokes(i));
        i = i + 50;

        setTimeout(() => agregarMas(i), 1000);
      } catch (error) {
        console.log(
          "no se pudieron conseguir los pokemones desde el id=",
          i,
          " hasta ",
          i + 50
        );
      }
    } else if (i >= 600 && i < 1200) {
      setTimeout(async () => {
        try {
          await dispatch(addPokes(i));
          i = i + 50;

          setTimeout(() => agregarMas(i), 5000);
        } catch (error) {
          console.log(
            "no se pudieron conseguir los pokemones desde el id=",
            i,
            " hasta ",
            i + 50
          );
        }
      }, 10000);
    } else if (i === 0) {
      getPokes();
      return;
    }
    return;
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.menu}>
        <button
          className={style.syncButton}
          onClick={() => {
            agregarMas(0);
          }}
        >{`${Pokemons.length}`}</button>
        <Link to="/home" className={style.Link}>
          <button className={style.btn}> HOME </button>
        </Link>
        <Link to="/create" className={style.Link}>
          <button className={style.btn}> CREATE </button>
        </Link>
        <Link to="/about" className={style.Link}>
          <button className={style.btn}> ABOUT </button>
        </Link>
      </div>

      <div className={style.logo}>
        <img src={logo} className={style.image} alt="logo"></img>
      </div>
    </div>
  );
};

export default NavBar;
