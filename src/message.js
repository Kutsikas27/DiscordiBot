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
};
