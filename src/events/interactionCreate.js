import { InteractionType } from "discord.js";

export default async function (bot, i) {
    if (i.type === InteractionType.ApplicationCommand) {
        const command = bot.slashes.get(i.commandName);
        if (command) {
            command.default(bot, i);
        }
    }
}