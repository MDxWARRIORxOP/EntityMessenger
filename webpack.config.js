const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    client: "./js/client.js",
    login: "./js/login.js",
    fontawesome: "./js/fontawesome.js",
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    // filename: "main.js",
  },
  watch: true,
  experiments: {
    topLevelAwait: true,
  },
};
