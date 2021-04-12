const Discord = require("discord.js");

require("dotenv").config();
const message = require("./message");
const invites = require("./invite");
const status = require("./status");
const poll = require("./Poll");
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
  poll(msg);
});

client.login(process.env.BOT_TOKEN);
