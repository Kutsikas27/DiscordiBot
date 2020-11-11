const Discord = require("discord.js");

require("dotenv").config();
const fs = require("fs");
const time = require("./aeg.js");
const client = new Discord.Client();
const channelId = "772846887472201738";
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
      .get(channelId)
      .send(
        `**${member.user.tag}** liitus koodiga ${invite.code} kasutajalt **${inviter.tag}**. Koodi kasutati ${invite.uses} korda loomisest alates.`
      );
  });
});

client.on("message", (msg) => {
  const { author, channel, content } = msg;
  if (author.bot) return;
  if (channel.id !== "769709626357841973") return;
  if (content === "pilt, kiisukas") {
    if (author.id === "378303769835995156") {
      return handleSendSexyImage(msg);
    } else {
      return handleKutsikasOnlyMessage();
    }
  }
});

const handleSendSexyImage = (msg) => {
  const pildiNumber = Math.floor(Math.random() * filenames.length);
  msg.channel.send({ files: ["./pildid/" + filenames[pildiNumber]] });
};

const handleKutsikasOnlyMessage = (msg) => {
  msg.channel.send("Ma teenin ainult isand Kutsikat!");
};

const handleSomethingElse = (msg) => {
  msg.channel.send("test töötab!");
};

client.login(process.env.BOT_TOKEN);
