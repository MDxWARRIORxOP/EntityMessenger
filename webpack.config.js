const path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/client.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,
  experiments: {
    topLevelAwait: true,
  },
};
