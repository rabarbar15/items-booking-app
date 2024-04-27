const { Item, Reservation } = require('./model');
const { Op } = require('sequelize');


exports.getAllItemsApi = async (req, res) => {
    try {
      const items = await Item.findAll();
      res.json(items)
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}; 
  
exports.getItemByIdApi = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findByPk(itemId);
        if (!item) {
        res.status(404).send('Item not found');
        } else {
        res.json(item)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAllReservationsApi = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations)
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}

exports.createReservationApi = async (req, res) => {
    try {
      const { uzytkownik, przedmiot_id, data_rezerwacji, godzina_rezerwacji } = req.body;
      const datetimeString = `${data_rezerwacji} ${godzina_rezerwacji}:00`;

      const count = await Reservation.count({
        where: {
            przedmiot_id,
            data_rezerwacji: {
              [Op.between]: [new Date(datetimeString), new Date(new Date(datetimeString).getTime() + 60 * 60 * 1000)]
            }
        }
      });

      if (count > 0) {
          return res.status(409).send("Termin rezerwacji zajęty")
      }

      const reservation = await Reservation.create({
        uzytkownik,
        przedmiot_id,
        data_rezerwacji: new Date(datetimeString)
      });
    

    res.status(201).json({ reservation });

    } catch (error) {
        console.error('Blad przy wykonywaniu rezerwacji: ', error.message);
        res.status(500).send('Błąd przy wykonywaniu rezerwacji.');
    }
};