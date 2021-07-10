const path = require('path');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-tailwind-dark-mode"
  ],
  webpackFinal: async (config) => {
    // 
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, '../src'),
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    });
    // keep this if you're doing typescript
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
}