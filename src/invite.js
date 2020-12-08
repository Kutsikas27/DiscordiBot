module.exports = function (client) {
  const invites = {};
  const infoChannelId = "772846887472201738";


  client.guilds.cache.forEach((g) => {
    g.fetchInvites().then((guildInvites) => {
      invites[g.id] = guildInvites;
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
};
