require('dotenv').config();

const key = process.env.STEAM_KEY;
const axios = require('axios');
const steam_api = "http://api.steampowered.com/ISteamUserStats";


async function httpGet(URL) {
    let data;
    await axios.get(URL)
        .then(function (response) {
            //console.log(response.data)
            data = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
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

module.exports = { getPlayerAchievements, getSchemaForGame};
