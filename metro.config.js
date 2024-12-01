const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add any custom configurations here
config.resolver.assetExts.push('db');
// config.resolver.assetExts.push('pte');
// config.resolver.assetExts.push('bin');

module.exports = config;
