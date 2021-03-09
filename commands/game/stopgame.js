const Game = require('../../src/game.js');

module.exports = {
  name: 'stopgame',
  description: 'Stop a game',
  cooldown: 5,
  execute(message) {
    const resistance = Game.readData();

    if(resistance.state !== 'stopped') {

      Game.initGame();

      message.reply ('Game stopped!');
    }
    else {
      return message.reply('Game already stopped!');
    }
  },

};