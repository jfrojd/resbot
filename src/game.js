const fs = require('fs');

class Game {

  static writeData(gameData) {
    const data = JSON.stringify(gameData, null, 2);
    fs.writeFileSync('game.json', data);

  }

  static readData() {
    const readData = fs.readFileSync('game.json');
    return JSON.parse(readData);

  }

  static initGame() {
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

  static shuffle(data) {

    for(let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
    }

    return data;

  }

}

module.exports = Game;