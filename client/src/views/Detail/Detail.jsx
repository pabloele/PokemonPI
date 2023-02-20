import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./Detail.module.css";
import axios from "axios";
const http = require("http");
const https = require("https");

const Detail = () => {
  const { id } = useParams();

  const [PokeDetail, setPokeDetail] = useState({});

  useEffect(() => {
    const pedirData = async () => {
      const response = await axios.get(`http://localhost:3001/pokemons/${id}`, {
        timeout: 0,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
      });

      setPokeDetail({ ...response.data });
    };

    pedirData();
  }, [id]);

  const handleDelete = async () => {
    // alert("eliminar");
    try {
      await axios.delete(`http://localhost:3001/pokemons/${id}`);
      alert("Pokemon eliminado");
    } catch (error) {
      alert("Pokemon no pudo ser eliminado");
    }
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.nombre}>
        <h1>Nombre: {PokeDetail.nombre}</h1>
      </div>

      <div className={style.detailContainer}>
        <div className={style.delete}>
          {isNaN(id) ? (
            <button onClick={handleDelete}>Eliminar este Pokemon</button>
          ) : null}
        </div>
        <div className={style.data}>
          <p>Tipos: {PokeDetail.tipo}</p>
          <p>Vida: {PokeDetail.vida}</p>
          <p>Ataque: {PokeDetail.ataque}</p>
          <p>Defensa: {PokeDetail.defensa}</p>
          <p>Altura: {PokeDetail.altura}</p>
          <p>Peso: {PokeDetail.peso}</p>
          <p>Velocidad: {PokeDetail.velocidad}</p>
        </div>
        <img src={PokeDetail.imagen} alt={PokeDetail.nombre} />
      </div>
      <Link to="/home" className={style.linkBack}>
        <button className={style.btnBack}>Volver</button>
      </Link>
    </div>
  );
};

export default Detail;
