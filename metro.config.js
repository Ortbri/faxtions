const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add any custom configurations here
config.resolver.assetExts.push('db');
/**
 * If you plan on adding your models to the assets instead of
 * fetching them from a url, you also need to add following lines to your metro.config.js:
 */
defaultConfig.resolver.assetExts.push('pte');
defaultConfig.resolver.assetExts.push('bin');

module.exports = config;
