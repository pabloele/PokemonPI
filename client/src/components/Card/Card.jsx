import style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = (props) => {
  return (
    <div className={style.card}>
      <Link to={`/detail/${props.id}`} className={style.link}>
        <p className={style.p}>{props.nombre}</p>
        <img src={props.imagen} alt="imagen de un poke" className={style.img} />
        <div className="style.types">
          {props.Tipos && props.Tipos.map((e) => <h6>{e}</h6>)}
        </div>
      </Link>
    </div>
  );
};

export default Card;
