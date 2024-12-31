import useHaptics from '@/hooks/useHaptics';
import { Ionicons } from '@expo/vector-icons';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import type React from 'react';
import { useCallback, useRef } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

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
  const colorScheme = useColorScheme();
  const styles = createStyles(colors);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },

        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint="prominent"
            style={{
              flex: 1,
              backgroundColor:
                colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.0)' : 'rgba(255, 255, 255, 0.5)',
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
            handlePresentModalPress();
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.aiButtonContainer}>
                <LinearGradient
                  colors={['#7C3AED', '#3B82F6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.aiButton}
                >
                  <Ionicons
                    name="sparkles"
                    size={20}
                    color="#fff"
                    // style={{ transform: [{ translateY: -12 }] }}
                  />
                </LinearGradient>
              </View>
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

const createStyles = (colors) =>
  StyleSheet.create({
    aiButtonContainer: {
      marginBottom: -24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    aiButton: {
      width: 46,
      height: 46,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });
