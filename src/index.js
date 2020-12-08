const Discord = require("discord.js");

require("dotenv").config();
const message = require("./message");
const invites = require("./invite");
const status = require("./status");
const client = new Discord.Client();

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
  message(msg);
});

<<<<<<< HEAD
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

=======
>>>>>>> e028295ff6ef0e80f928a4c46a31d8cac23207f6
client.login(process.env.BOT_TOKEN);
