const express = require('express');
const router = express.Router();

router.get("/", (request,response) => {
    let steamIds = request.cookies.amgSteamIds;
    response.render('config/config.pug', { steamIds });
});

router.post("/", (request, response) => {
    let options = {
        maxAge: 1000 * 60 * 60 * 24 * 30, // expira em 30 dias
        httpOnly: true,
    }

    //let ids = request.body.steamids.split('\r\n')

    response.cookie('amgSteamIds', request.body.steamids, options);
    let steamIds = request.body.steamids
    response.render('config/config.pug', { steamIds });
});

module.exports = router;