const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ partials: ["CHANNEL"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]});

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "events");
    client.handleCommands(commandFolders, "commands");
    client.login(process.env.token)
    global.queue = [];
    global.rejected = [];
    global.client = client;
})();
