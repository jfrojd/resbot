const Game = require('../../src/game.js');

module.exports = {
  name: 'gamestate',
  description: 'Check the status of the game',
  cooldown: 5,
  execute(message) {
    const resistance = Game.readData();

    message.channel.send(JSON.stringify(resistance, null, 2));
  },

};