const express = require('express');
const getLOLData = require('../utils/lol-server'); 
const router = express.Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const summonerName = 'Doublelift';
    const data = await getLOLData('/lol/summoner/v4/summoners/by-name', summonerName);
    console.log('data: ', data);
    res.render("index");
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
