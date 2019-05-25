const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString, {useNewUrlParser: true});

//carregando as models
const Product = require('./models/product');
const Deparment = require('./models/department');

//carrega as rotas
const indexRoute = require('./routes/index-route.js');
const productRoute = require('./routes/product-route.js');
const departmentRoute = require('./routes/department-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors);

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/department', departmentRoute);

module.exports = app;
