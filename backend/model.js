const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Item = sequelize.define('Item', {
  nazwa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  opis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  miejsce: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

const Reservation = sequelize.define('Reservation', {
    uzytkownik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    przedmiot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_rezerwacji: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

module.exports = { Item, Reservation };