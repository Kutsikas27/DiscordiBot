module.exports = function (msg) {
  const discord = require("discord.js");
  const { author, channel, content } = msg;
  const prefix = "?";
  if (msg.author.bot) return;

  ////POLL +poll
  if (content.includes(prefix + "poll")) {
    let args = msg.content.substring(prefix.length).split(" ");
    switch (args[0]) {
      case "poll":
        const Embed = new discord.MessageEmbed()
          .setColor(0xffc300)
          .setTitle("Error")
          .setDescription("Lisa küsimus!");

        if (!args[1]) {
          msg.channel.send(Embed);
          break;
        }

        let msgArgs = args.slice(1).join(" ");
        const questionEmbed = new discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("📋 " + msgArgs);

        channel.send(questionEmbed).then((messageRecation) => {
          messageRecation.react("✅");
          messageRecation.react("❎");
          msg.delete();
        });

        break;
    }
  }
};
