const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID, //uuid para que no se pise con el id de la api
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true, //va a ser la clave primaria
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.INTEGER
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    image: {
      type: DataTypes.TEXT
    }
  });
};

// PARA PODER LOCALIZAR O DIFERENCIAR RECETA CREADA EN DB
// createdInDb: {
//   type: DataTypes.BOOLEAN,
//   allowNull: false,
//   defaultValue: true;
// }