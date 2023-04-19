const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("User", {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
      // defaultValue: DataTypes.UUIDV4,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    credits: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
