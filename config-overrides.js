const { override } = require('customize-cra');

module.exports = override(
  (config) => {
    config.module.rules.forEach(rule => {
      if (rule.oneOf) {
        rule.oneOf.forEach(oneOf => {
          if (
            oneOf.loader &&
            oneOf.loader.indexOf('babel-loader') !== -1 &&
            oneOf.options &&
            oneOf.options.plugins
          ) {
            oneOf.options.plugins.push(
              require.resolve('@babel/plugin-proposal-private-property-in-object')
            );
          }
        });
      }
    });
    return config;
  }
);
