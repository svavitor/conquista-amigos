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
                //console.log(player) 
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
    console.log(steamIds);

    if(!steamIds || steamIds == "") steamIds = "76561198074458381,76561198016665594,76561198069575376,76561198081399729,76561198075737081";

    
    await getPlayerSummaries(steamIds).then(async res => {
        players = res.response.players.player;
        pegaPlayers(players);
    }).catch(() => {
        mensagem += "Erro ao buscar jogador. "
    });

    
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