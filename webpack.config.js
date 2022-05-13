const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    client: "./js/client.js",
    login: "./js/login.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "main.js",
  },
  watch: false,
  experiments: {
    topLevelAwait: true,
  },
};
