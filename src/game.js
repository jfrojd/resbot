class Game {
    constructor (state, playerCount,resistanceCount,traitorCount,registeredPlayers) {
      this.state = state;
      this.playerCount = playerCount;
      this.resistanceCount = resistanceCount;
      this.traitorCount = traitorCount;
      this.registeredPlayers = registeredPlayers;
    }
  }

  module.exports = Game;