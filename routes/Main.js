const express = require('express');
const { getPlayerAchievements, getSchemaForGame, getPlayerSummaries } = require("../steamapi");
const router = express.Router();

let gameAchievements;

let promiseList = [];
let gameId = '548430';

let players = [];

function pegaPlayers(players){
    players.forEach((player) => {
        let novaProm = getPlayerAchievements(gameId, player?.steamid)
            .then(res => { 
                return { 
                    nome: player.personaname,
                    profileurl: player.profileurl,
                    avatar: player.avatar,
                    achievements: res?.playerstats.achievements 
                }});
        promiseList.push(novaProm);
    });
}

router.post("/", (request, response) => {
    gameId = request.body.gameSearch;
    console.log(gameId);
    response.redirect('/');
});

router.get("/", async (request, response) => {

    players = [];
    promiseList = [];
    
    let steamIds = request.cookies.amgSteamIds;
    
    if(steamIds){
        steamIds = steamIds.replaceAll('\r\n',',');

        await getPlayerSummaries(steamIds).then(async res => {
            players = res.response.players.player;
            pegaPlayers(players);
        });
        
        await getSchemaForGame(gameId).then(res => {
            
            gameAchievements = res.game.availableGameStats.achievements;
        }).catch(() => response.render('erro'));

        Promise.all(promiseList)
        .then(valores => {
            response.render('index', { gameAchievements , players: valores });
        })
        .catch(() => response.send("Nenhum player cadastrado entre em <a href='/config'> config </a>."));

    } else {
        response.send("Nenhum player cadastrado entre em <a href='/config'> config </a>.");
    }

});

module.exports = router;