const fs = require('fs');
const Discord = require('discord.js');
const game = require('./src/game.js');
const readData = fs.readFileSync('game.json');
const resistance = JSON.parse(readData);

const assignRole = () => {
  

}