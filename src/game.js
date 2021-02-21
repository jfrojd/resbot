const fs = require('fs');

const initGame = () => {
  const game = {
    state: 'stopped',
    playerCount: 0,
    resistanceCount: 0,
    traitorCount: 0,
    availableRoles: [],
    registeredPlayers: {},
  };
  const data = JSON.stringify(game, null, 2);

  fs.writeFileSync('game.json', data);

};

exports.initGame = initGame;