import Sequelize from "sequelize";
const sequelize = new Sequelize("matches","root","imdev1996",{
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
      timestamps: false
    },
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  })


export { sequelize }