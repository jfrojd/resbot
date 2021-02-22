const fs = require('fs');

class Game {

  writeData(gameData) {
    const data = JSON.stringify(gameData, null, 2);
    fs.writeFileSync('game.json', data);

  }

  readData() {
    const readData = fs.readFileSync('game.json');
    return JSON.parse(readData);

  }

  initGame() {
    const gameData = {
      state: 'stopped',
      playerCount: 0,
      resistanceCount: 0,
      traitorCount: 0,
      availableRoles: [],
      registeredPlayers: {},
    };

    this.writeData(gameData);
  }

}

module.exports = Game;