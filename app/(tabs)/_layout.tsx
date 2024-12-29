import useHaptics from '@/hooks/useHaptics';
import { Ionicons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import type React from 'react';
import { useCallback, useRef } from 'react';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={22} style={{ marginBottom: -24 }} {...props} />;
}

export default function TabLayout() {
  const { lightHaptic } = useHaptics();
  const { colors } = useTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  /* --------------------------------- return --------------------------------- */
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'trasnparent',
          borderColor: 'transparent',
        },

        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint="prominent"
            style={{
              flex: 1,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon name={focused ? 'home' : 'home-outline'} color={colors.text} />;
          },
        }}
      />
      <Tabs.Screen
        name="log"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            lightHaptic();
            console.log('tabPress');
            handlePresentModalPress();
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon name={focused ? 'sparkles' : 'sparkles-outline'} color={colors.text} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon name={focused ? 'person' : 'person-outline'} color={colors.text} />;
          },
        }}
      />
    </Tabs>
  );
}
