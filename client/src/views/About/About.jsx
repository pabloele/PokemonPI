import style from "./About.module.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className={style.mainAbout}>
      {/* Acerca de este proyecto */}
      <Link to="/home">
        <button>Volver a home</button>
      </Link>
    </div>
  );
};

export default About;
