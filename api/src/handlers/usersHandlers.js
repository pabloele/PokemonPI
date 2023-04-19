const {
  getUsers,
  getUser,
  createUser,

  deleteUser,
} = require("../controllers/usersControllers");

const getUserHandler = async (req, res) => {
  res.status(200).json("NIY: getUser");
  //   const { id } = req.params;

  //   try {
  //     let resultado;

  //     if (id) {
  //       const resultado = await getUser(id);

  //       res.status(200).json(resultado);
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
};

const getUsersHandler = async (req, res) => {
  res.status(200).json("NIY: getusers");
  //   try {
  //     const resultado = await getUsers();

  //     res.status(200).json(resultado);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
};

const createUserHandler = async (req, res) => {
  //res.status(200).json("NIY: createUser");

  try {
    const { uid, email, userName, credits } = req.body;
    console.log(req.body);
    const newUser = await createUser(uid, email, userName, credits);

    res
      .status(201)
      .json({ message: "el user ha sido creado con éxito ", newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  res.status(200).json("NIY: deleteUser");
  //   const { id } = req.params;

  //   try {
  //     await deleteUser(id);
  //   } catch (error) {
  //     res.status(400).json({ error: "El User no pudo ser eliminado con éxito" });
  //   }

  //   res.status(200).json({
  //     message: "User eliminado con éxito",
  //   });
};

module.exports = {
  getUsersHandler,
  getUserHandler,
  createUserHandler,
  deleteUserHandler,
};
