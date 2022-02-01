const { format } = require("timeago.js");

const helpers = {};

helpers.tiempoPasado = (timestamp) => format(timestamp);

module.exports = helpers;
