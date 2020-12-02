const Discord = require("discord.js");

require("dotenv").config();
const fs = require("fs");
const time = require("./aeg.js");
const invites = require("./invite");
const status = require("./status");
const client = new Discord.Client();
const filenames = fs.readdirSync("./pildid");
const Auditlog = require("discord-auditlog");

Auditlog(client, {
  "769670695424622623": {
    auditlog: "info",
    movement: "info",
    auditmsg: "info",
  },
});

client.on("ready", () => {
  invites(client);
  status(client);
});

client.on("message", (msg) => {
  const { author, channel, content } = msg;
  const authorKutsikas = "378303769835995156";
  if (author.bot) return;
  if (content === "?pilt") {
    if (author.id === authorKutsikas) {
      return handleSendSexyImage(msg);
    } else {
      return handleKutsikasOnlyMessage(msg);
    }
  }
  if (content === "?uptime" && author.id === authorKutsikas) {
    return botUpTime(msg);
  }

  if (
    (author.id === authorKutsikas && content.includes("onju")) ||
    (author.id === authorKutsikas && content.includes("eksju"))
  ) {
    return reactMessage(msg);
  }
  
});

const handleSendSexyImage = (msg) => {
  const pildiNumber = Math.floor(Math.random() * filenames.length);
  msg.channel.send({ files: ["./pildid/" + filenames[pildiNumber]] });
};

const handleKutsikasOnlyMessage = (msg) => {
  msg.channel.send("Ma teenin ainult isand Kutsikat!");
};

const botUpTime = (msg) => {
  msg.channel.send(time(client.uptime / 1000));
};
const reactMessage = (msg) => {
  msg.react("👍");
  msg.react("💋");
};

client.login(process.env.BOT_TOKEN);
