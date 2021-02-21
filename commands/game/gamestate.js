const fs = require('fs');


module.exports = {
  name: 'gamestate',
  description: 'Check the status of the game',
  cooldown: 5,
  execute(message) {
    const readData = fs.readFileSync('game.json');
    const resistance = JSON.parse(readData);

    message.channel.send(` Game state is: ${resistance.state} \n Number of players: ${resistance.playerCount} \n Number of resistance members: ${resistance.resistanceCount} \n Number of traitors: ${resistance.traitorCount} \n Players in the game: ${resistance.registeredPlayers.toString()}`);

  },

};