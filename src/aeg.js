function quantify(data, unit, value, allowZero, mitmus) {
  if (value || (allowZero && !value)) {
    if (value > 1 || value < -1 || value === 0) {
      unit += mitmus;
    }

    data.push(value + " " + unit);
  }

  return data;
}

function fix10(number) {
  return number.toFixed(10);
}

module.exports = function prettySeconds(seconds) {
  var prettyString = "";
  var data = [];

  if (typeof seconds === "number") {
    data = quantify(data, "päev", parseInt(fix10(seconds / 86400)), false, "a");
    data = quantify(
      data,
      "tund",
      parseInt(fix10((seconds % 86400) / 3600)),
      false,
      "i"
    );
    data = quantify(
      data,
      "minut",
      parseInt(fix10((seconds % 3600) / 60)),
      false,
      "it"
    );
    data = quantify(
      data,
      "sekund",
      Math.floor(seconds % 60),
      data.length < 1,
      "it"
    );

    const length = data.length;
    var i;

    for (i = 0; i < length; i++) {
      if (prettyString.length > 0) {
        if (i === length - 1) {
          prettyString += " and ";
        } else {
          prettyString += ", ";
        }
      }

      prettyString += data[i];
    }
  }

  return prettyString;
};
