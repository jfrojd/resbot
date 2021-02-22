const Game = require('../../src/game.js');
const runningGame = new Game ();

module.exports = {
  name: 'stopgame',
  description: 'Stop a game',
  cooldown: 5,
  execute(message) {
    const resistance = runningGame.readData();

    if(resistance.state !== 'stopped') {

      runningGame.initGame();

      message.reply ('Game stopped!');
    }
    else {
      return message.reply('Game already stopped!');
    }
  },

};