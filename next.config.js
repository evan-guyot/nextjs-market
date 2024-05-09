module.exports = {
  webpack: (config, { isServer }) => {
    // ... other configuration

    config.module.rules.push({
      test: /nw-pre-gyp\/index\.html$/,
      loader: "null-loader",
    });

    return config;
  },
};
