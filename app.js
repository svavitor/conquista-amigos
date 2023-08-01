const express = require('express');
require('dotenv').config();

const mainRoute = require('./routes/Main');
const configRoute = require('./routes/Config');

const app = express();

app.set('view engine', 'pug');

app.use('/', mainRoute);
app.use('/config', configRoute);

app.listen(process.env.PORT || 3000, () =>{
    console.log(`Executando em http://localhost:${process.env.PORT || 3000}/.`);
});