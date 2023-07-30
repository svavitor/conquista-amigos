const express = require('express');
const { getPlayerAchievements, getSchemaForGame } = require("../steamapi");
const router = express.Router();

let gameAchievements;

const promiseList = [];

const players = [
    {"nome": "twist","steamid": "76561198074458381"},
    {"nome": "Kuro","steamid": "76561198016665594"},
    {"nome": "Cone","steamid": "76561198069575376"},
    //{"nome": "Fayt","steamid": "76561198081399729"},
    {"nome": "Lyn","steamid": "76561198075737081"}
];

players.forEach((player) => {
    let novaProm = getPlayerAchievements('548430', player.steamid)
        .then(res => { 
            return { 
                nome: player.nome, 
                achievements: res.playerstats.achievements 
            }});
    promiseList.push(novaProm);
});

getSchemaForGame('548430').then(res => {
    gameAchievements = res.game.availableGameStats.achievements;
});

router.get("/", (request,response) => {

    Promise.all(promiseList)
        .then(valores => {
            response.render('index', { gameAchievements , players: valores });
        })
        .catch(() => response.send("Erro ao requisitar dados."));
});

module.exports = router;