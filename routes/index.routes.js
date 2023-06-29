const express = require('express');
const lolService = require('../utils/lol-service'); 
const router = express.Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const summonerName = 'Doublelift';
    const apiSummonersEndpoint = '/lol/summoner/v4/summoners/by-name';
    const data = await lolService(apiSummonersEndpoint, summonerName);
    console.log('data: ', data);
    res.render("index");
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
