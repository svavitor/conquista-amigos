const express = require('express');

const router = express.Router();

router.get("/",(request,response) => {
    const conquista = {
        id: 1,
        nome: 'teste',
        desc: 'teste conquista'
    }

    response.render('index', { conquista });
});

module.exports = router;