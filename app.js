const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (request, response) =>{
    const conquista = {
        id: 1,
        nome: 'teste',
        desc: 'teste conquista'
    }

    response.render('index', { conquista });
});

app.listen(3000, () =>{
    console.log("Executando em http://localhost:3000/.");
});