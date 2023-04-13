const { Router } = require("express");
const {
  getPokemonsHandler,
  getPokemonHandler,
  createPokemonHandler,
  deletePokemonHandler,
  getApiPokemonsHandler,
} = require("../handlers/pokemonsHandlers");

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokemonsHandler);
pokemonsRouter.get("/addPokemons", getApiPokemonsHandler);

pokemonsRouter.get("/:id", getPokemonHandler);

pokemonsRouter.post("/", createPokemonHandler);

pokemonsRouter.delete("/:id", deletePokemonHandler);

module.exports = pokemonsRouter;
