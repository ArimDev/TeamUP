import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";

export const slash = new SlashCommandBuilder()
    .setName('help')
    .setDescription(`Opens TeamUP help menu`);

export default async function run(bot, i) {
    function msToTime(ms) {
        let s = Math.floor((ms / 1000) % 60),
            min = Math.floor((ms / (1000 * 60)) % 60),
            h = Math.floor((ms / (1000 * 60 * 60)));

        if (h === 0) h = "";
        else h = h + "h";

        if (min === 0) min = "";
        else min = min + "min";

        if (!h && !min) {
            s = s + "s";
            return s;
        } else {
            return !!h ? (h + " " + min) : (min);
        }
    }

    const commands = fs.readdirSync(path.resolve("./src/commands")).filter(file => file.endsWith('.js'));
    const helpEmbed = new EmbedBuilder()
        .setTitle("Help menu")
        .setDescription(`> **Ping**: \`${bot.ws.ping > 1 ? bot.ws.ping + " ms" : "..."}\`\n> **Uptime**: \`${msToTime(bot.uptime)}\`\n> **Commands**: \`${commands.length}\`\n> **GitHub**: [over here](https://github.com/Azator-Entertainment/TeamUP/)`)
        .setColor("#760276")
        .setFooter({ text: bot.user.username, iconURL: bot.user.avatarURL() });
    i.reply({ embeds: [helpEmbed] });
};