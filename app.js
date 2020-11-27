const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect('mongodb+srv://Cedricocos:tatitatitutu@cluster0.1cdtm.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion � MongoDB r�ussie !'))
    .catch(() => console.log('Connexion � MongoDB �chou�e !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', productRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;