const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const { sequelize } = require('../config/sequelize.config');

const db = {};
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync all models that are not 
// already in the database 
// sequelize.sync(); 
    
// Force sync all models 
// It will drop the table first  
// and re-create it afterwards 
// sequelize.sync({force:true}).catch((err) => console.log(err));


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;