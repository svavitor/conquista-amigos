const express = require('express');
const { getPlayerAchievements, getSchemaForGame, getPlayerSummaries } = require("../steamapi");
const router = express.Router();

let gameAchievements;

let promiseList = [];

let players = [
    //{"nome": "twist","steamid": "76561198074458381"},
    //{"nome": "Kuro","steamid": "76561198016665594"},
    //{"nome": "Cone","steamid": "76561198069575376"},
   // {"nome": "Fayt","steamid": "76561198081399729"},
  //  {"nome": "Lyn","steamid": "76561198075737081"}
];

function pegaPlayers(players){
    players.forEach((player) => {
        let novaProm = getPlayerAchievements('548430', player?.steamid)
            .then(res => { 
                return { 
                    nome: player.personaname, 
                    achievements: res?.playerstats.achievements 
                }});
        promiseList.push(novaProm);
    });
}

router.get("/", async (request,response) => {
    players = [];
    promiseList = [];

    let steamIds = request.cookies.amgSteamIds;

    steamIds = steamIds.replaceAll('\r\n',',');

    await getPlayerSummaries(steamIds).then(async res => {
        players = res.response.players.player;
        pegaPlayers(players);
    });
    
    await getSchemaForGame('548430').then(res => {
        gameAchievements = res.game.availableGameStats.achievements;
    });

    Promise.all(promiseList)
        .then(valores => {
            response.render('index', { gameAchievements , players: valores });
        })
        .catch(() => response.send("Nenhum player cadastrado entre em /config."));
});

module.exports = router;