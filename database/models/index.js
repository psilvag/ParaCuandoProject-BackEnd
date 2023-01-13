//models/index.js
'use strict';

const fs = require('fs');
const path = require('path');
//.
//.
//.
const config = require(__dirname + '/../config/config.js')[env]; //verify this line 

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

/*
 En esta parte ¡Se llama el associate() en cada modelo!
 Hay grupos de trabajo que agregan siempre 1 x 1 al archivo index y entonces
 utilizan .sync() u associate() para estos objetivos.
 Usando sequelize-cli, solo tendremos que preocuparnos por agregar
 de manera correcta los modelos, migraciones y asociaciones
*/

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

