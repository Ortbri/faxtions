import { MMKV } from 'react-native-mmkv';
import { StyleSheet } from 'react-native-unistyles';
const sharedStyles = {
  fs: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  br: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  gap: (v: number) => v * 8,
};

// list black to white 1-10 and a inverse for light theme and dark theme
// const defaultTheme = {
//   color1: '#000000',
//   color2: '#1a1a1a',
//   color3: '#333333',
//   color4: '#4d4d4d',
//   color5: '#666666',
//   color6: '#808080',
//   color7: '#999999',
//   color8: '#b3b3b3',
//   color9: '#cccccc',
//   color10: '#ffffff',
// };

const lightTheme = {
  colors: {
    primary: '#ff1ff4',
    secondary: '#1ff4ff',
    backgroundColor: '#ffffff',
    text: '#000000',
    border: '#e0e0e0',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#f44336',
    info: '#2196F3',
    muted: '#9e9e9e',
    highlight: '#E3F2FD',
  },
  ...sharedStyles,
};

const otherTheme = {
  colors: {
    primary: '#FF8C00', // Deep orange
    secondary: '#4169E1', // Royal blue
    backgroundColor: '#F5DEB3', // Wheat/tan color
    text: '#2F4F4F', // Dark slate gray
    border: '#DEB887', // Burly wood
    success: '#228B22', // Forest green
    warning: '#DAA520', // Goldenrod
    error: '#8B0000', // Dark red
    info: '#4682B4', // Steel blue
    muted: '#A0522D', // Sienna
    highlight: '#F0E68C', // Khaki
  },
  ...sharedStyles,
};

const darkTheme = {
  colors: {
    primary: '#aa12ff',
    secondary: 'pink',
    backgroundColor: '#000000',
    text: '#ffffff',
    border: '#333333',
    success: '#43A047',
    warning: '#FFB300',
    error: '#E53935',
    info: '#1E88E5',
    muted: '#757575',
    highlight: '#1A237E',
  },
  ...sharedStyles,
};

const appThemes = {
  light: lightTheme,
  other: otherTheme,
  dark: darkTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
    // initialTheme: () => {
    //   const storage = new MMKV();
    //   return (storage.getString('preferredTheme') ?? 'dark') as keyof typeof appThemes;
    // },
    /**
     * Adaptive themes allow Unistyles to automatically
     *  manage the selection of your themes based on device color
     *  scheme settings. To enable this, you need to meet two conditions:
     */
    // adaptiveTheme: true, //
  },
  breakpoints,
  themes: appThemes,
});
