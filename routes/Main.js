const express = require('express');
const { getPlayerAchievements, getSchemaForGame, getPlayerSummaries } = require("../steamapi");
const router = express.Router();

let gameAchievements;

let promiseList = [];
let gameId = '548430';

let players = [];
let mensagem = '';

function pegaPlayers(players){
    players.forEach((player) => {
        let novaProm = getPlayerAchievements(gameId, player?.steamid)
            .then(res => {
                console.log(player) 
                if(!player) {
                    mensagem += 'SteamId inválida. ';
                }
                return { 
                    nome: player?.personaname,
                    profileurl: player?.profileurl,
                    avatar: player?.avatar,
                    achievements: res?.playerstats.achievements 
                }});
        promiseList.push(novaProm);
    });
}

router.post("/", (request, response) => {
    gameId = request.body.gameSearch;
    response.redirect('/');
});

router.get("/", async (request, response) => {

    players = null;
    promiseList = [];
    mensagem = '';
    
    let steamIds = request.cookies.amgSteamIds;
    
    steamIds = steamIds.replaceAll('\r\n',',');

    if(steamIds){
        await getPlayerSummaries(steamIds).then(async res => {
            players = res.response.players.player;
            pegaPlayers(players);
        }).catch(() => {
            mensagem += "Erro ao buscar jogador. "
        });
    }
    
    await getSchemaForGame(gameId).then(res => {
        gameAchievements = res.game.availableGameStats.achievements;
    }).catch(() => {
        mensagem += "Erro ao buscar jogo. "
    });

    await Promise.all(promiseList)
    .then(valores => {
        players = valores;
    })
    .finally(() => {
        if(!steamIds){
            mensagem += "Nenhum player válido cadastrado. ";
        }
        response.render('index', { gameAchievements , players: players, msg: mensagem });
    });   

});

module.exports = router;