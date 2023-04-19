const { Router } = require("express");
const pokemonsRouter = require("./pokemonsRouter");
const typesRouter = require("./typesRouter");
const openaiRouter = require("./openaiRouter");
const usersRouter = require("./userRouter");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonsRouter);

router.use("/types", typesRouter);

router.use("/openai", openaiRouter);

router.use("/users", usersRouter);

module.exports = router;
