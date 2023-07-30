const express = require('express');
const { getPlayerAchievements, getSchemaForGame } = require("../steamapi");

let gameAchievements;

getPlayerAchievements('548430','76561198074458381');

getSchemaForGame('548430').then(res => {
    gameAchievements = res.game.availableGameStats.achievements
});


const router = express.Router();

router.get("/",(request,response) => {
    const conquista = {
        id: 1,
        nome: 'teste',
        desc: 'teste conquista'
    }

    response.render('index', { conquista, gameAchievements });
});

module.exports = router;