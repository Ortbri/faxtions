import useHaptics from '@/src/hooks/useHaptics';
import { useClientOnlyValue } from '@/src/lib/useClientOnlyValue.web';
import { useColorScheme } from '@/src/lib/useColorScheme';
import Octicons from '@expo/vector-icons/Octicons';
import { useTheme } from '@react-navigation/native';
import { Link, Tabs, router } from 'expo-router';
import type React from 'react';
import { Pressable } from 'react-native-gesture-handler';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: string;
}) {
  return <Octicons size={22} style={{ marginBottom: -20 }} {...props} />;
}

export default function TabLayout() {
  const { colors } = useTheme();
  const { lightHaptic } = useHaptics();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderColor: 'transparent',
        },
        headerTitle: 'hello',
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="log"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            lightHaptic();
            router.push('/chat');
          },
        }}
        options={{
          title: 'Log',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
