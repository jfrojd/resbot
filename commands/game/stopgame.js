const fs = require('fs');
const game = require('../../src/game.js');

module.exports = {
  name: 'stopgame',
  description: 'Stop a game',
  cooldown: 5,
  execute(message) {
    const readData = fs.readFileSync('game.json');
    const resistance = JSON.parse(readData);

    if(resistance.state !== 'stopped') {

      game.initGame();

      message.reply ('Game stopped!');
    }
    else {
      return message.reply('Game already stopped!');
    }
  },

};