module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // ... other configuration

    config.module.rules.push({
      test: /nw-pre-gyp\/index\.html$/,
      loader: "null-loader",
    });

    return config;
  },
};
