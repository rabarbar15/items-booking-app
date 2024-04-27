const express = require("express");
const { getAllItemsApi, getItemByIdApi, getAllReservationsApi, createReservationApi } = require("./controllers")
const router = express.Router();


router.route("/przedmioty")
    .get(getAllItemsApi)

router.route("/przedmioty/:id")
    .get(getItemByIdApi)

router.route("/rezerwacje")
    .get(getAllReservationsApi)
    .post(createReservationApi)

module.exports = router;
