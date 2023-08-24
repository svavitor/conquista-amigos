const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const mainRoute = require('./routes/Main');
const configRoute = require('./routes/Config');

const app = express();

app.use(express.static('public'))
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRoute);
app.use('/config', configRoute);


app.listen(process.env.PORT || 3000, () =>{
    console.log(`Executando em http://localhost:${process.env.PORT || 3000}/.`);
});