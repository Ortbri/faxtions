// import { Text } from "@/components/primitives/slot";
// import { Button } from "@/components/ui/Button";
import Sheet from "@/components/custom/sheet";
import useHaptics from "@/hooks/useHaptics";
import { useClientOnlyValue } from "@/lib/useClientOnlyValue.web";
import Octicons from "@expo/vector-icons/Octicons";
import {
  type BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
// import { House } from "@/lib/icons/House";
// import { Sparkles } from "@/lib/icons/Sparkles";
// import { CircleUserRound } from "@/lib/icons/CircleUserRound";
// import { cn } from "@/lib/utils";
import { BlurView } from "expo-blur";
import { Slot, Tabs, router } from "expo-router";
import type React from "react";
import { useCallback, useRef } from "react";
import { View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Octicons>["name"];
  color: string;
}) {
  return <Octicons size={22} style={{ marginBottom: -20 }} {...props} />;
}

export default function TabLayout() {
  const { lightHaptic } = useHaptics();
  const { bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "trasnparent",
            marginHorizontal: 20,
            height: 60,
            borderRadius: 30,
            borderColor: "transparent",
            bottom: bottom,
            left: 0,
            right: 0,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={40}
              tint="prominent"
              style={{ flex: 1, overflow: "hidden", borderRadius: 30, backgroundColor: colorScheme === 'dark' ? 'rgba(0, 0, 0, .6)' : 'rgba(242, 242, 242, .6)',}}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              // <House
              //   className={cn(
              //     "text-foreground mt-[20px]", // base styles
              //     focused ? "text-primary" : "text-gray-500", // conditional styles
              //   )}
              //   size={23}
              //   strokeWidth={focused ? 2.5 : 2}
              // />
            ),
          }}
        />
        <Tabs.Screen
          name="log"
          // listeners={{
          //   tabPress: (e) => {
          //     e.preventDefault();
          //     lightHaptic();
          //     console.log("tabPress");
          //     handlePresentModalPress();
          //   },
          // }}
          options={{
            title: "Log",
            tabBarIcon: ({ focused }) => (
              // <Sparkles
              //   // onPressIn={lightHaptic}
              //   className={cn(
              //     "text-foreground mt-[20px]", // base styles
              //     focused ? "text-primary" : "text-gray-500", // conditional styles
              //   )}
              //   size={23}
              //   strokeWidth={focused ? 2.5 : 2}
              // />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerTitle: "Profile",
            tabBarIcon: ({ focused }) => (
              // <CircleUserRound
              //   className={cn(
              //     "text-foreground mt-[20px]", // base styles
              //     focused ? "text-primary" : "text-gray-500", // conditional styles
              //   )}
              //   size={23}
              //   strokeWidth={focused ? 2.5 : 2}
              // />
            ),
          }}
        />
      </Tabs>
      <Sheet
        index={1}
        footerAction={() => console.log("testing")}
        snapPoints={["50%", "90%"]}
        ref={bottomSheetModalRef}
        showBackdrop
      >
        <BottomSheetView className="px-14">
          <View style={{backgroundColor: 'red'}} />
        </BottomSheetView>
      </Sheet>
      {/* <BottomSheetModal
        index={1}
        snapPoints={["50%", "90%"]}
        ref={bottomSheetModalRef}
      >
        <BottomSheetView className="px-14">
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal> */}
    </BottomSheetModalProvider>
  );
}
