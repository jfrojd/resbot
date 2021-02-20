const fs = require('fs');
const resistance = require('../../game.json');

module.exports = {
  name: 'stopgame',
  description: 'Stop a game',
  cooldown: 5,
  execute(message) {
    if(resistance.state !== 'stopped') {
      resistance.state = 'stopped';
      resistance.playerCount = 0;
      resistance.resistanceCount = 0;
      resistance.traitorCount = 0;
      resistance.registeredPlayers = [];

      const data = JSON.stringify(resistance, null, 2);
      fs.writeFileSync('game.json', data);

      message.reply ('Game stopped!');
    }
    else {
      return message.reply('Game already stopped!');
    }
  },

};