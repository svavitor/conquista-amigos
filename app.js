const express = require('express');
const mainRoute = require('./routes/Main');

const app = express();

app.set('view engine', 'pug');

app.use('/', mainRoute);

app.listen(3000, () =>{
    console.log("Executando em http://localhost:3000/.");
});