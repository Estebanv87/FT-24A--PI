const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("diet", {
    title: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.UUID, //uuid para que no se pise con el id de la api
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, //va a ser la clave primaria
    }
  });
};