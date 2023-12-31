require('dotenv').config();

const key = process.env.STEAM_KEY;
const axios = require('axios');
const steam_api = "http://api.steampowered.com/ISteamUserStats";

//axios.defaults.timeout = 30000;

async function httpGet(URL) {
    let data;
    await axios.get(URL, { timeout: 30000})
        .then(function (response) {
            data = response.data;
        })
        .catch(function (error) {
            console.log(`Erro: ${error.response.status} - ${error.code}`);
            return data = null;
        });
    return data;
}

function getPlayerAchievements(gameid, steamid) {
    let url = `${steam_api}/GetPlayerAchievements/v0001/?appid=${gameid}&key=${key}&steamid=${steamid}`;
    return httpGet(url);
}

function getSchemaForGame(gameid){
    let url = `${steam_api}/GetSchemaForGame/v2/?key=${key}&appid=${gameid}`
    return httpGet(url);
}

function getPlayerSummaries(steamids){
    let url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0001/?key=${key}&steamids=${steamids}`
    return httpGet(url);
}

module.exports = { getPlayerAchievements, getSchemaForGame, getPlayerSummaries};

