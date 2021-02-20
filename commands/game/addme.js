const fs = require('fs');
const resistance = require('../../game.json');

module.exports = {
  name: 'addme',
  description: 'Add a player to a game',
  cooldown: 5,
  execute(message) {
    if(resistance.state !== 'started') {
      return message.reply('Game is not accepting new players! Wait for the game to end or start a new one.');
    }
    else if(resistance.registeredPlayers.length >= resistance.playerCount) {
      return message.reply('Game is already full!');
    }
    // else if(resistance.registeredPlayers.includes(message.author.username)) {
    // return message.reply('You are already in the game!');
    // }
    else {
      resistance.registeredPlayers.push(message.author.username);

      const data = JSON.stringify(resistance, null, 2);
      fs.writeFileSync('game.json', data);

      message.reply('You have been added to the game!');
    }
  },

};