const resistance = require('../../src/game.js');

module.exports = {
  name: 'startgame',
  args:true,
  description: 'Start a new game',
  usage: '[number of players]',
  cooldown: 5,
  execute(message, args) {
    console.log(resistance.state);
    if(resistance.state !== 'stopped') {
      message.channel.send('Game already started!');
      return;
    }
    else if(args.length !== 1) {
      message.channel.send('Incorrect amount of arguments. Please pass only one one number as player count');
      return;
    }
    else if(!parseInt(args[0])) {
      message.channel.send('Given playercount is not a number!');
      return;
    }
    else if (args[0] < 5 || args[0] > 10) {
      message.channel.send('Incorrect number of players, please give a number between 5 and 10');
      return;
    }
    else {
      message.channel.send(`New game started with ${args[0]} players!`);
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
    }
  },

};