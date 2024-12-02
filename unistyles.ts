import { StyleSheet } from 'react-native-unistyles';

const lightTheme = {
  colors: {
    primary: '#ff1ff4',
    secondary: '#1ff4ff',
  },
  gap: (v: number) => v * 8,
};

const otherTheme = {
  colors: {
    primary: '#aa12ff',
    secondary: 'pink',
  },
  gap: (v: number) => v * 8,
};

const darkTheme = {
  colors: {
    primary: '#aa12ff',
    secondary: 'pink',
  },
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

/**
 * could use mmkv to get preferred theme from user's preferences
 */
// StyleSheet.configure({
//   settings: {
//     initialTheme: () => {
//       // get preferred theme from user's preferences/MMKV/SQL etc.
//       return storage.getString('preferredTheme') ?? 'light';
//     },
//   },
// });

// to get the current theme
// const styles = StyleSheet.create(theme => ({
//     ...
// }))

// to get current theme name
// import { UnistylesRuntime } from 'react-native-unistyles';

// access the current theme name in your component
// export const UserTheme = () => (
//     <Text>
//         Selected theme is {UnistylesRuntime.themeName}
//     </Text>
// )

StyleSheet.configure({
  settings: {
    initialTheme: () => {
      return 'light';
    },
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
