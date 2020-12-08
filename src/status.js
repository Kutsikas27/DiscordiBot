module.exports = function (client) {
  client.user.setActivity("Restart");
  setTimeout(function () {
    client.user.setActivity('"The Wire"', { type: "WATCHING" });
  }, 17000);
};
