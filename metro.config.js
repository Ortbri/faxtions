// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname, { isCSSEnabled: true });

defaultConfig.resolver.assetExts.push('pte');
defaultConfig.resolver.assetExts.push('bin');

module.exports = withNativeWind(defaultConfig, { input: './global.css' });
