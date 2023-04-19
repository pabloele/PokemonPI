const axios = require("axios");
const { Pokemon, Tipo, User } = require("../db");

const http = require("http");
const https = require("https");
const { log } = require("console");

const getUsers = async () => {
  return "nIY: get users";
};

//SELECCIONA UN POKEMON POR 'id' EN LA DB

const getUser = async (id) => {
  return "NIY: getUser by id";
  //   let rawResult = await Pokemon.findAll({
  //     where: { id: id },
  //     include: {
  //       model: Tipo,
  //       attributes: ["nombre"],
  //       through: { attributes: [] },
  //     },
  //   });

  //   return result[0];
};
// SELECCIONA UN POKEMON POR SU 'id', BUSCA EN LA BD Y EN LA API

const createUser = async (uid, email, userName, credits) => {
  // CREA EL User

  const newUser = await User.create({
    uid,
    email,
    userName,
    credits,
  });
  console.log("asdfasdfasdfasdf", newUser);
};

const deleteUser = async (id) => {
  return "NIY delete user controller";
  //   try {
  //     return await User.destroy({
  //       where: {
  //         id: id,
  //       },
  //     });
  //   } catch (error) {}
};

module.exports = {
  getUsers,
  getUser,
  createUser,

  deleteUser,
};
