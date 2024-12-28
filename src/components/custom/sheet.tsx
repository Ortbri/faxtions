import useHaptics from "@/hooks/useHaptics";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultFooterProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types";
import { useTheme } from "@react-navigation/native";
import { XIcon } from "lucide-react-native";
import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
// import {X}
// import
import { X } from "@/lib/icons/X";

interface BSheetProps extends Omit<BottomSheetModalProps, "children"> {
  children: React.ReactNode;
  footerAction?: () => void;
  footerBottomInset?: number;
  showBackdrop?: boolean;
}

const Sheet = React.forwardRef<BottomSheetModal, BSheetProps>(
  (
    {
      children,
      snapPoints = ["25%", "50%", "90%"],
      onChange,
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      index = 1,
      footerAction,
      footerBottomInset = 25,
      showBackdrop = false,
      ...rest
    },
    ref,
  ) => {
    /* ---------------------------------- hooks --------------------------------- */
    const { colors } = useTheme();
    const { lightHaptic } = useHaptics();
    /* ------------------------------- snap points ------------------------------ */
    const points = useMemo(() => snapPoints, [snapPoints]);
    /* -------------------------------- backdrop -------------------------------- */
    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
      if (showBackdrop) {
        return (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        );
      }
      return undefined;
    }, []);
    /* --------------------------------- footer --------------------------------- */
    const renderFooter = useCallback(
      (
        props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps,
      ) => {
        if (footerAction) {
          return (
            <BottomSheetFooter {...props} bottomInset={footerBottomInset}>
              <View className="flex flex-1 self-end mr-3-">
                <Pressable
                  className={
                    "p-4 rounded-3xl items-center justify-center bg-primary-foreground"
                  }
                  onPress={footerAction}
                  onPressIn={lightHaptic}
                >
                  <X className="text-foreground" size={23} strokeWidth={1.25} />
                </Pressable>
              </View>
            </BottomSheetFooter>
          );
        }
        return undefined;
      },
      [
        // colors.primary,
        // colors.background,
        footerAction,
        footerBottomInset,
        lightHaptic,
      ],
    );
    /* --------------------------------- return --------------------------------- */
    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={points}
        onChange={onChange}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        handleIndicatorStyle={{
          backgroundColor: colors.border,
          width: 40,
        }}
        backgroundStyle={
          {
            // backgroundColor: colors.card,
          }
        }
        {...rest}
      >
        <BottomSheetView
          style={{
            flex: 1,
          }}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default Sheet;
