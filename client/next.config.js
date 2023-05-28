const path = require("path");

module.exports = {
  webpackDevMiddlware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
