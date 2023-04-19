const { Router } = require("express");
const {
  getUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
} = require("../handlers/usersHandlers");

const usersRouter = Router();

usersRouter.get("/", getUsersHandler);

usersRouter.get("/:id", getUserHandler);

usersRouter.post("/", createUserHandler);

usersRouter.delete("/:id", deleteUserHandler);

module.exports = usersRouter;
