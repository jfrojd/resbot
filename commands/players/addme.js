const Game = require('../../src/game.js');
const runningGame = new Game ();

module.exports = {
  name: 'addme',
  description: 'Add a player to a game',
  cooldown: 5,
  execute(message) {
    const resistance = runningGame.readData();

    if(resistance.state !== 'started') {
      return message.reply('Game is not accepting new players! Wait for the game to end or start a new one.');
    }
    else if(Object.keys(resistance.registeredPlayers).length >= resistance.playerCount) {
      return message.reply('Game is already full!');
    }
    else if(Object.prototype.hasOwnProperty.call(resistance.registeredPlayers, message.author.username)) {
      return message.reply('You are already in the game!');
    }
    else {
      resistance.registeredPlayers[message.author.username] = {};
      resistance.registeredPlayers[message.author.username].role = resistance.availableRoles[0];
      resistance.availableRoles.shift();

      runningGame.writeData(resistance);

      return message.author.send (`Your role is ${resistance.registeredPlayers[message.author.username].role}`)
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply('You have been added to the game! Your role has been sent to you as a DM.');
        })
        .catch(error => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
          message.reply('Could not send your role to you as a DM! Do you have DMs disabled?');
        });
    }
  },

};