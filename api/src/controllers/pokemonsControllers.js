const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
const { idTypeByNombre } = require("./typesControllers");
const http = require("http");
const https = require("https");

// LIMPIA LOS DATOS OBTENIDOS EN LA BD Y LES DA FORMATO PARA MATCHEAR LA SALIDA CON LOS QUE VIENEN DE LA API

const cleanData = (raw) => {
  let salida = [];

  for (let i = 0; i < raw.length; i++) {
    raw[i].dataValues.Tipos = raw[i].dataValues.Tipos.map((e) => e.nombre);
    salida.push(raw[i].dataValues);
  }

  return salida.map((e) => {
    return {
      id: e.id,
      nombre: e.nombre,
      imagen: e.imagen,
      tipo: e.Tipos,
      vida: Number(e.vida),
      ataque: Number(e.ataque),
      defensa: Number(e.defensa),
      velocidad: Number(e.velocidad),
      altura: Number(e.altura),
      peso: Number(e.peso),
    };
  });
};

//DEVUELVE SOLO DATOS PARA LA RUTA PPAL
const filterData = (data) => {
  return data.map((e) => {
    return {
      id: e.id,
      nombre: e.nombre,
      imagen: e.imagen,
      tipo: e.tipo,
      ataque: e.ataque,
    };
  });
};

// TRAE TODOS LOS POKEMONES DE LA API CON LAS PROPIEDADES NECESARIAS PARA LA PÁGINA PRINCIPAL

const getApiPokemons = async () => {
  let rawListado = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=40",
    {
      timeout: 0,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    }
  );

  let promisifiedPokes = [];

  rawListado.data.results.map((e) =>
    promisifiedPokes.push(
      axios.get(e.url, {
        timeout: 0,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
      })
    )
  );

  const pokemones = await Promise.all(promisifiedPokes);

  const salida = pokemones.map((e, i) => {
    return {
      id: e.data.id,
      nombre: e.data.name,
      imagen: e.data.sprites.other.home.front_default,
      tipo: e.data.types.map((elemento) => elemento.type.name),
      ataque: e.data.stats[1].base_stat,
    };
  });

  return salida;
};

//TRAE TODOS LOS POKEMONES DE LA DB CON LAS PROPIEDADES NECESARIAS PARA LA PÁGINA PRINCIPAL
const getBdPokemons = async () => {
  const rawData = await Pokemon.findAll({
    include: [
      {
        model: Tipo,
        attributes: ["nombre"],
        through: { attributes: [] },
      },
    ],
  });

  let data = filterData(cleanData(rawData));

  return data;
};

//TRAE TODOS LOS POKEMONES UNIFICANDO API Y DB
const getAllPokemons = async () => {
  const apiPokes = await getApiPokemons();
  const bdPokes = await getBdPokemons();
  const todosLosPokes = [...bdPokes, ...apiPokes];

  return todosLosPokes;
};
//SELECCIONA UN POKEMON POR 'id' EN LA API
const getPokeFromApiById = async (id) => {
  let temp = (
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      timeout: 0,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    })
  ).data;

  const tipos = [];
  temp.types.forEach((e) => {
    tipos.push(e.type.name);
  });

  let pokeDetail = {
    id: temp.id,
    nombre: temp.name,
    imagen: temp.sprites.front_default,
    tipo: tipos,
    vida: temp.stats[0].base_stat,
    ataque: temp.stats[1].base_stat,
    defensa: temp.stats[2].base_stat,
    velocidad: temp.stats[5].base_stat,
    altura: temp.height,
    peso: temp.weight,
  };

  return pokeDetail;
};

//SELECCIONA UN POKEMON POR 'id' EN LA DB

const getPokeFromDBById = async (id) => {
  let rawResult = await Pokemon.findAll({
    where: { id: id },
    include: {
      model: Tipo,
      attributes: ["nombre"],
      through: { attributes: [] },
    },
  });

  result = cleanData(rawResult);

  return result[0];
};
// SELECCIONA UN POKEMON POR SU 'id', BUSCA EN LA BD Y EN LA API

const getPokemonDetailById = async (id, fuente) => {
  console.log("FUENTE", fuente);
  const pokeDetail =
    fuente === "API"
      ? await getPokeFromApiById(id)
      : await getPokeFromDBById(id);
  // console.log(pokeDetail);
  return pokeDetail;
};

// BUSCA EL POKEMON POR "name" EN LA API
const buscaPokeEnApi = async (name) => {
  let temp = (
    await axios(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      timeout: 0,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    })
  ).data;

  const tipos = [];
  temp.types.forEach((e) => {
    tipos.push(e.type.name);
  });

  let pokeFound = {
    id: temp.id,
    nombre: temp.name,
    imagen: temp.sprites.front_default,
    tipo: tipos,
  };

  return pokeFound;
};

// BUSCA EL POKEMON POR "name" EN LA DB
const buscaPokeEnDb = async (name) => {
  const result = await Pokemon.findAll({
    where: { nombre: name },
    include: {
      model: Tipo,
      attributes: ["nombre"],
      through: { attributes: [] },
    },
  });

  const data = cleanData(result);

  //console.log(data[0])
  return data[0];
};

// BUSCA EL POKEMON EN TODAS LAS FUENTES POR "name"
const getPokemonByQuery = async (name) => {
  try {
    const response = await buscaPokeEnApi(name);

    return response;
  } catch (error) {
    try {
      const result = await buscaPokeEnDb(name);

      return result;
    } catch (error) {
      throw Error(
        `No se ha encontrado el Pokemon "${name}" ni en la api ni en la Db`
      );
    }
  }
};

// CREA UN POKEMON > LO GUARDA EN LA BASE DE DATOS Y ESTABLECE LA(S) RELACION(ES) CON SU(S) TIPOS

const createPokemon = async (
  nombre,
  imagen,
  vida,
  ataque,
  defensa,
  velocidad,
  altura,
  peso,
  tipos
) => {
  // CREA EL POKEMON

  const newPokecito = await Pokemon.create({
    nombre: nombre,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
  });

  // ESTABLECE LAS RELACIONES DEL NUEVO POKEMON CON TODOS LOS TIPOS QUE LLEGAN EN EL ARRAY 'tipos'

  let idType;

  tipos.forEach(async (e) => {
    idType = await idTypeByNombre(e); // OBTIENE EL ID DEL TIPO
    await newPokecito.addTipo(idType); // ESTABLECE LA RELACION
  });
};

const destroyPoke = async (id) => {
  try {
    return await Pokemon.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {}
};

module.exports = {
  getAllPokemons,
  getPokemonDetailById,
  createPokemon,
  getPokemonByQuery,
  destroyPoke,
};
