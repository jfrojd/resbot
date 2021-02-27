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

  shuffleRoles(resistanceCount, traitorCount) {

    const availableRoles = [];
    let i = 0;

    while(i < resistanceCount) {
      availableRoles.push('resistance');
      i++;
    }

    i = 0;

    while(i < traitorCount) {
      availableRoles.push('traitor');
      i++;
    }

    for(i = availableRoles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = availableRoles[i];
      availableRoles[i] = availableRoles[j];
      availableRoles[j] = temp;
    }

    return availableRoles;

  }

}

module.exports = Game;