console.log("Launching the process...");

import { config } from "dotenv";
import { Client, GatewayIntentBits, Collection } from "discord.js";

let bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

bot.slashes = new Collection();

import { events, commands } from "./src/functions/handlers.js";
events(bot);
commands(bot);

bot.login(config().parsed.botToken);