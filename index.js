const Discord = require("discord.js");
const config = require("./config.json");
const Game = require("./src/game.js");

const client = new Discord.Client();

const prefix = "resbot.";

const resistance = new Game ("stopped",0,0,0,[]);

//Wait for the Discord client to be ready
client.on('ready', () => {
    console.log('I am ready!');
  });

//Command handler
client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  //Initialize a new game
  if (command === "startgame") {
    if(resistance.state !== "stopped" ) {
      message.channel.send("Game already started!");
      return;
    }
    else if(args.length !== 1 ) {
      message.channel.send("Incorrect amount of arguments. Please pass only one one number as player count");
      return;
    }
    else if(!parseInt(args[0]) ) {
      message.channel.send("Given playercount is not a number!");
      return;
    }
    else if (args[0] < 5 || args[0] > 10) {
      message.channel.send("Incorrect number of players, please give a number between 5 and 10");
      return;
    }
    else {
      message.channel.send(`New game started with ${args[0]} players!`);
      resistance.state = "started";
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

  }

  //Stop an ongoing game
  if (command === "stopgame") {
    message.channel.send(`Game stopped!`);
    resistance.state = "stopped";
    resistance.playerCount = 0;
    resistance.resistanceCount = 0;
    resistance.traitorCount = 0;

  }

  //Debugging command to see the state of the game and players
  if (command === "gamestate") {
    message.channel.send(` Game state is: ${resistance.state} \n Number of players: ${resistance.playerCount} \n Number of resistance members: ${resistance.resistanceCount} \n Number of traitors: ${resistance.traitorCount} \n Players in the game: ${resistance.registeredPlayers.toString()}`);
  }

  if (command === "addme") {
    if(resistance.state !== "started") {
      message.reply("Game is not accepting new players! Wait for the game to end or start a new one.");
      return;
    }
    else if(resistance.registeredPlayers.length >= resistance.playerCount) {
      message.reply("Game is already full!")
      return;
    }
    else if(resistance.registeredPlayers.includes(message.author)) {
      message.reply("You are already in the game!")
      return;
    }
    else {
      resistance.registeredPlayers.push(message.author);
      message.reply("You have been added to the game!");
    }
  }
});

client.login(config.BOT_TOKEN);