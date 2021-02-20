const resistance = require('../../game.json');

module.exports = {
  name: 'gamestate',
  description: 'Check the status of the game',
  cooldown: 5,
  execute(message) {
    message.channel.send(` Game state is: ${resistance.state} \n Number of players: ${resistance.playerCount} \n Number of resistance members: ${resistance.resistanceCount} \n Number of traitors: ${resistance.traitorCount} \n Players in the game: ${resistance.registeredPlayers.toString()}`);

  },

};