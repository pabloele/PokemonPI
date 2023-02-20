const { Router } = require("express");
const {
  getPokemonsHandler,
  getPokemonHandler,
  createPokemonHandler,
  deletePokemonHandler,
} = require("../handlers/pokemonsHandlers");

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokemonsHandler);

pokemonsRouter.get("/:id", getPokemonHandler);

pokemonsRouter.post("/", createPokemonHandler);

pokemonsRouter.delete("/:id", deletePokemonHandler);

module.exports = pokemonsRouter;
