import useHaptics from '@/hooks/useHaptics';
import { useClientOnlyValue } from '@/lib/useClientOnlyValue.web';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs, router } from 'expo-router';
import type React from 'react';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: string;
}) {
  return <Octicons size={22} style={{ marginBottom: -20 }} {...props} />;
}

export default function TabLayout() {
  const { lightHaptic } = useHaptics();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
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
          headerTitle: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
