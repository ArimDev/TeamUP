import { SlashCommandBuilder, EmbedBuilder, messageLink } from "discord.js";

export const slash = new SlashCommandBuilder()
    .setName('p')
    .setDescription(`Shows online players right now`)
    .addStringOption(option =>
        option.setName('game')
            .setDescription("Choose a game")
            .addChoices(
                { name: 'CS:GO', value: 'Counter-Strike: Global Offensive' },
                { name: 'Minecraft', value: 'Minecraft' },
                { name: 'Rocket League', value: 'Rocket League' },
            )
            .setRequired(false));

export default async function run(bot, i) {
    let gameShortcut, onlineM, ingameM, gameM;
    const game = i.options.getString("game");

    const games = [
        { name: 'CS:GO', value: 'Counter-Strike: Global Offensive' },
        { name: 'Minecraft', value: 'Minecraft' },
        { name: 'Rocket League', value: 'Rocket League' }
    ];
    if (game) gameShortcut = games.find(g => g.value === game)?.name;

    await i.guild.members.fetch({ withPresences: true }).then(fetchedM => {
        onlineM = fetchedM.filter(m => m.presence?.status !== undefined);
        ingameM = fetchedM.filter(m => m.presence?.activities.length > 0);
        if (game) gameM = ingameM.filter(m => !!m.presence.activities.find(a => a.name === game)?.name);
    });

    const pEmbed = new EmbedBuilder()
        .setTitle("Ingame members")
        .setDescription(`> **Online**: \`${onlineM.size}\`\n> **Ingame**: \`${ingameM.size}\`` + (gameM ? `\n> **In ${gameShortcut}**: \`${gameM.size}\`` : ""))
        .setColor("#760276")
        .setFooter({ text: bot.user.username, iconURL: bot.user.avatarURL() });
    i.reply({ embeds: [pEmbed] });
};