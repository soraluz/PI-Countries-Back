const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('touristActivity', {
      name: {
      type: DataTypes.STRING,
      allowNull: false,      
      },
      difficulty:{
        type:DataTypes.INTEGER,
        validate:{
          isIn: [['',1,2,3,4,5]], 
        }
      },
      duration:{
        type:DataTypes.INTEGER
      },
      season:{
        type:DataTypes.STRING,
        validate:{
          isIn:[['','Verano', 'Otoño','Invierno','Primavera']]
        } 
      }
  },{
    timestamps:false
  });
};
