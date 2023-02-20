const {
  getAllPokemons,
  getPokemonDetailById,
  createPokemon,
  getPokemonByQuery,
  destroyPoke,
} = require("../controllers/pokemonsControllers");

const getPokemonsHandler = async (req, res) => {
  const { name } = req.query;

  try {
    let resultado;

    if (name) {
      const result = await getPokemonByQuery(name);

      resultado = { ...result };
    } else {
      resultado = await getAllPokemons();
    }

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonHandler = async (req, res) => {
  const { id } = req.params;
  const fuente = isNaN(id) ? "DB" : "API";

  try {
    const detail = await getPokemonDetailById(id, fuente);

    res.status(200).json(detail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  try {
    const {
      nombre,
      imagen,
      tipos_str,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
    } = req.body;

    const tipos = tipos_str.split(",");

    const newPokecito = await createPokemon(
      nombre,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      tipos
    );

    res
      .status(201)
      .json({ message: "el pokemon ha sido creado con éxito ", newPokecito });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePokemonHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await destroyPoke(id);
  } catch (error) {
    res
      .status(400)
      .json({ error: "El Pokemon no pudo ser eliminado con éxito" });
  }

  res.status(200).json({
    message: "Pokemon eliminado con éxito",
  });
};

module.exports = {
  getPokemonsHandler,
  getPokemonHandler,
  createPokemonHandler,
  deletePokemonHandler,
};
