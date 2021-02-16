const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const prefix = 'resbot.';

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const cooldowns = new Discord.Collection();

// Wait for the Discord client to be ready
client.on('ready', () => {
  console.log('I am ready!');
});

// Command handler
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('You can not do this!');
    }
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});


/*
// Command handler
client.on('message', function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  // Initialize a new game
  if (command === 'startgame') {
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

  }

  // Stop an ongoing game
  if (command === 'stopgame') {
    message.channel.send('Game stopped!');
    resistance.state = 'stopped';
    resistance.playerCount = 0;
    resistance.resistanceCount = 0;
    resistance.traitorCount = 0;

  }

  // Debugging command to see the state of the game and players
  if (command === 'gamestate') {
    message.channel.send(` Game state is: ${resistance.state} \n Number of players: ${resistance.playerCount} \n Number of resistance members: ${resistance.resistanceCount} \n Number of traitors: ${resistance.traitorCount} \n Players in the game: ${resistance.registeredPlayers.toString()}`);
  }

  if (command === 'addme') {
    if(resistance.state !== 'started') {
      message.reply('Game is not accepting new players! Wait for the game to end or start a new one.');
      return;
    }
    else if(resistance.registeredPlayers.length >= resistance.playerCount) {
      message.reply('Game is already full!');
      return;
    }
    else if(resistance.registeredPlayers.includes(message.author)) {
      message.reply('You are already in the game!');
      return;
    }
    else {
      resistance.registeredPlayers.push(message.author);
      message.reply('You have been added to the game!');
    }
  }
});
*/

client.login(config.BOT_TOKEN);