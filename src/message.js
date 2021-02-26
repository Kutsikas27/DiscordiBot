const fs = require("fs");
const filenames = fs.readdirSync("./pildid");
const time = require("./aeg.js");
module.exports = function (msg) {
  const { author, channel, content } = msg;
  const authorKutsikas = "378303769835995156";
  const handleSendSexyImage = (msg) => {
    const pildiNumber = Math.floor(Math.random() * filenames.length);
    msg.channel.send({ files: ["./pildid/" + filenames[pildiNumber]] });
  };
  console.log(msg);

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
  const reactAvatar = (msg) => {
    msg.channel.send(
      msg.author.displayAvatarURL({
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
  
  if (content === "!avatar") return reactAvatar(msg);
};
