import { DarkTheme, DefaultTheme, ThemeProvider as RNTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    // ...DefaultTheme.colors,
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5856D6',
    grey: '#8E8E93',
    lightGrey: '#C7C7CC',
    darkGrey: '#48484A',
    transparent: 'transparent',
  },
};

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
    secondary: '#5E5CE6',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#5E5CE6',
    grey: '#8E8E93',
    lightGrey: '#48484A',
    darkGrey: '#636366',
    transparent: 'transparent',
  },
};

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <RNTheme value={colorScheme === 'dark' ? customDarkTheme : customDefaultTheme}>
      {props.children}
    </RNTheme>
  );
}
