const express = require('express')
const cors = require("cors")
const app = express()
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./database');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


sequelize.sync().then(() => console.log('Database is ready'))

app.use("/api", routes)

app.listen(3000, () => {
    console.log('server is running');
})
