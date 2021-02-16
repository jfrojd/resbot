class Game {
  constructor(state, playerCount, resistanceCount, traitorCount, registeredPlayers) {
    this.state = state;
    this.playerCount = playerCount;
    this.resistanceCount = resistanceCount;
    this.traitorCount = traitorCount;
    this.registeredPlayers = registeredPlayers;
  }
}

const resistance = new Game ('stopped', 0, 0, 0, []);

module.exports = resistance;