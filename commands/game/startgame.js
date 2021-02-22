const Game = require('../../src/game.js');
const runningGame = new Game ();

module.exports = {
  name: 'startgame',
  args:true,
  description: 'Start a new game',
  usage: '[number of players]',
  cooldown: 5,
  execute(message, args) {
    const resistance = runningGame.readData();

    if(resistance.state !== 'stopped') {
      return message.reply('Game already started!');
    }
    else if(!parseInt(args[0])) {
      return message.reply('Given playercount is not a number!');
    }
    else if (args[0] < 5 || args[0] > 10) {
      return message.reply('Incorrect number of players, please give a number between 5 and 10');
    }
    else {
      message.reply(`New game started with ${args[0]} players!`);
      resistance.state = 'started';
      resistance.playerCount = parseInt(args[0]);
      if(resistance.playerCount === 10) {
        resistance.traitorCount = 4;
      }
      else if (resistance.playerCount > 6 && resistance.playerCount < 10) {
        resistance.traitorCount = 3;
      }
      else {
        resistance.traitorCount = 2;
      }
      resistance.resistanceCount = resistance.playerCount - resistance.traitorCount;
      runningGame.writeData(resistance);
    }
  },

};