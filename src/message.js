const fs = require("fs");
const filenames = fs.readdirSync("./pildid");
const time = require("./aeg.js");
const Discord = require("discord.js");
module.exports = function (msg) {
  const { author, channel, content } = msg;
  const authorKutsikas = "378303769835995156";
  const handleSendSexyImage = (msg) => {
    const pildiNumber = Math.floor(Math.random() * filenames.length);
    msg.channel.send({ files: ["./pildid/" + filenames[pildiNumber]] });
  };
  console.log(msg.author.username + ": " + msg.content);

  const handleKutsikasOnlyMessage = (msg) => {
    msg.channel.send("Ma teenin ainult isand Kutsikat!");
  };

  const botUpTime = (msg) => {
    msg.channel.send(time(msg.client.uptime / 1000));
  };
  const reactMessage = (msg) => {
    msg.react("👍");
    msg.react("💋");
  };
  const bankLink = (msg) => {
    msg.channel.send("Swedbank: EGERT TÕNSTRÖM EE492200221060238691");
  };
  const supportersList = (msg) => {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("💋TOP 10:💋")
      .addField("`1:` Marta", "**115€**", true)
      .setFooter("Swedbank: EGERT TÕNSTRÖM EE492200221060238691");

    channel.send(exampleEmbed);
  };
  const reactAvatar = (msg) => {
    let user = msg.mentions.users.first();
    if (!user) user = msg.author;

    msg.channel.send(
      user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      })
    );
  };

  if (author.bot) return;
  if (content === "!pilt") return handleSendSexyImage(msg);

  if (content === "!uptime" && author.id === authorKutsikas) {
    return botUpTime(msg);
  }

  if (
    (author.id === authorKutsikas && content.includes("onju")) ||
    (author.id === authorKutsikas && content.includes("eksju"))
  ) {
    return reactMessage(msg);
  }

  if (msg.content.includes("!avatar")) return reactAvatar(msg);
  if (msg.content == "!toeta") return bankLink(msg);
  if (msg.content == "!top") return supportersList(msg);
};
