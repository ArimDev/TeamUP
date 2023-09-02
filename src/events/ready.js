import art from "ascii-art";

export default async function (bot) {
    console.log("<< ------------------------------------------------- >>\n\n\n");
    console.log(await art.font("TeamUP", 'big'));
    console.log("<< ------------------------------------------------- >>");
    console.log(`i > https://discord.com/oauth2/authorize?client_id=${bot.user.id}&permissions=292192136256&scope=bot%20applications.commands`);
    console.log("s > Discord bot operational!");
}