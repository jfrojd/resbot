const Game = require('../../src/game.js');
const runningGame = new Game ();


module.exports = {
  name: 'gamestate',
  description: 'Check the status of the game',
  cooldown: 5,
  execute(message) {
    const resistance = runningGame.readData();

    message.channel.send(JSON.stringify(resistance, null, 2));
  },

};