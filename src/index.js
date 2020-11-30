const Discord = require("discord.js");

require("dotenv").config();
const fs = require("fs");
const time = require("./aeg.js");
const client = new Discord.Client();
const infoChannelId = "772846887472201738";
const testServerId = "768209775741501460";
const invites = {};
const wait = require("util").promisify(setTimeout);
const filenames = fs.readdirSync("./pildid");
const Auditlog = require("discord-auditlog");

Auditlog(client, {
  "769670695424622623": {
    auditlog: "info",
    movement: "info",
    auditmsg: "info",
  },
});

client.on("ready", async () => {
  client.user.setActivity('"Sopranos"', { type: "WATCHING" });
  await wait(1000);

  client.guilds.cache.forEach((g) => {
    g.fetchInvites().then((guildInvites) => {
      invites[g.id] = guildInvites;
    });
  });
});
client.on("guildMemberAdd", (member) => {
  member.guild.fetchInvites().then((guildInvites) => {
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(
      (i) => ei.get(i.code) && ei.get(i.code).uses < i.uses
    );

    const inviter = client.users.cache.get(invite.inviter.id);

    client.channels.cache
      .get(infoChannelId)
      .send(
        `**${member.user.tag}** liitus koodiga ${invite.code} kasutajalt **${inviter.tag}**. Koodi kasutati ${invite.uses} korda loomisest alates.`
      );
  });
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
    (author.id === authorKutsikas && content.includes("onju?")) ||
    (author.id === authorKutsikas && content.includes("eksju?"))
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
