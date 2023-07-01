const express = require('express');
const {
  getChampionsData,
  getLOLPlayerDataFromApi,
  getGameLOLDataFromApi
} = require('../utils/lol-service'); 
const router = express.Router();

/* GET champions*/
router.get("/champions", async (req, res, next) => {
  try {
    const { data } = await getChampionsData();
    const champions = data.data;
    const championsNames = Object.keys(champions);
    console.log('championsNames: ', championsNames)
    console.log('Zyra info: ', champions['Zyra'])
  } catch (error) {
    console.error(error)
  }
});

router.get("/matches", async (req, res, next) => {
  try {

    const summonerName = 'Yuggen AF';
    const summonerEndpoint = `/lol/summoner/v4/summoners/by-name/${summonerName}`;
    const summoner = await getLOLPlayerDataFromApi(summonerEndpoint);
    console.log('summoner: ', summoner.data);

    const puuid = summoner.data.puuid;
    console.log('puuid: ', puuid);
    const endpoint = `/lol/match/v5/matches/by-puuid/${puuid}/ids`
    const data = await getGameLOLDataFromApi(endpoint);
    console.log('game played by summonerName data: ', data)
  } catch (error) {
    console.error(error)
  }
});

// router.get("/matches/:id/detail", async (req, res, next) => {
router.get("/matches/detail", async (req, res, next) => {
  try {
    // const { id } = req.params;
    const matchId = 'LA1_1404719359';
    const endpoint = `/lol/match/v5/matches/${matchId}`; 
    const { data } = await getGameLOLDataFromApi(endpoint);
    const { participants: participantsPuuid } = data.metadata;

    // for (const participantPuuid of participantsPuuid) {
    //   const endpoint = `/lol/match/v5/matches/by-puuid/${participantPuuid}/ids`
    //   const participantInfo = await getGameLOLDataFromApi(endpoint);
    //   console.log('participantInfo: ', participantInfo.data);
    // }
    //
    const urls = []
    data.info.participants.forEach(p => {
      console.log('participant name: ', p.championName)
      urls.push({
        url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p.championName}_0.jpg`
      });
    })
    res.render('index', { urls })
  } catch (error) {
    console.error(error)
  }
});

    // const extra = ''
    // const puuid = '';
    // const apiEndpoint = `/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    // const data = await getLOLPlayerDataFromApi(apiSummonersEndpoint, extra);
    // console.log('data: ', data);
    // res.render("index");

module.exports = router;
