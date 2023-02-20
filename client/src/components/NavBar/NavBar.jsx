import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../resources/img/logo.png";
import { getPokes } from "../../redux/actions";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <div className={style.mainContainer}>
      <div className={style.menu}>
        <button
          className={style.syncButton}
          onClick={() => {
            dispatch(getPokes());
          }}
        />
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
