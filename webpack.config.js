const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/client.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  watch: false,
  experiments: {
    topLevelAwait: true,
  },
};
