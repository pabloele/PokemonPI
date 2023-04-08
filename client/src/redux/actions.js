import axios from "axios";
export const GET_POKEMONES = "GET_POKEMONES";
export const GET_TIPOS = "GET_TIPOS";
export const SAVE_FILTERS = "SAVE_FILTERS";
export const GET_QUERY = "GET_QUERY";
// ACTION CREATOR getPokes: ESTA FUNCION DEVUELVE UNA FUNCIÓN QUE DEVELVE ACTION TYPE Y PAYLOAD
// ASYNCRÓNICAMENTE LUEGO DE RECIBIR LA INFORMACIÓN DEL SERVIDOR.
// DADO QUE LA API NO RESPONDE A ESTA PETICIÓN SI SE REPITE EN UN INTERVALO DE TIEMPO MUY CORTO,
// SE AÑADIÓ A ESTA FUNCIÓN UN INTENTO PERSISTENTE RECURSIVO LUEGO DE ESPERAR 60 SEGUNDOS.
const http = require("http");
const https = require("https");

export const getPokes = () => {
  return async function (dispatch) {
    let apiData;

    const pedirData = async () => {
      try {
        apiData = await axios.get("http://localhost:3001/pokemons/", {
          timeout: 0,
          httpAgent: new http.Agent({ keepAlive: true }),
          httpsAgent: new https.Agent({ keepAlive: true }),
        });
        const Pokemones = apiData.data;
        dispatch({ type: GET_POKEMONES, payload: Pokemones });
      } catch (error) {
        console.log(
          `El servidor no devolvió la información solicitada. Reintentando en 60 segundos...`
        );
        setTimeout(pedirData, 60000);
      }
    };

    pedirData();
  };
};

// ACTION CREATOR getTipos CREA UNA F() ASYNCRONICA QUE REALIZA LA PETICIÓN DE LOS TIPOS Y LOS DISPATHCEA AL ESTADO GLOBAL

export const getTipos = () => {
  return async function (dispatch) {
    let tipos;

    const pedirData = async () => {
      tipos = await axios.get("http://localhost:3001/types", {
        timeout: 0,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
      });

      dispatch({ type: GET_TIPOS, payload: tipos.data });
    };

    pedirData();
  };
};

export const getQuery = (nombre) => {
  return async function (dispatch) {
    let query;

    if (nombre) {
      const pedirData = async () => {
        query = await axios.get(
          `http://localhost:3001/pokemons?name=${nombre}`,
          {
            timeout: 0,
            httpAgent: new http.Agent({ keepAlive: true }),
            httpsAgent: new https.Agent({ keepAlive: true }),
          }
        );

        dispatch({ type: GET_QUERY, payload: query.data });
      };
      pedirData();
    } else {
      dispatch({ type: GET_QUERY, payload: "" });
    }
  };
};

export const saveFilters = (
  currentPage,
  sortDirection,
  selectedType,
  orderBy,
  source
) => {
  return function (dispatch) {
    const guardaFiltros = () => {
      dispatch({
        type: SAVE_FILTERS,
        payload: { currentPage, sortDirection, selectedType, orderBy, source },
      });
    };

    guardaFiltros();
  };
};
