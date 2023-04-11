const { Router } = require("express");
const { generateImage } = require("../handlers/openaiHandlers");

const openaiRouter = Router();

openaiRouter.post("/", generateImage);

module.exports = openaiRouter;
