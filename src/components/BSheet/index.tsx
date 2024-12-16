// import useHaptics from '@/hooks/useHaptics';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import {
//   BottomSheetBackdrop,
//   type BottomSheetBackdropProps,
//   BottomSheetFooter,
//   BottomSheetModal,
//   type BottomSheetModalProps,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet';
// import type { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
// import { useTheme } from '@react-navigation/native';
// import React, { useCallback, useMemo } from 'react';
// import { Pressable, StyleSheet, View } from 'react-native';

// interface BSheetProps extends Omit<BottomSheetModalProps, 'children'> {
//   children: React.ReactNode;
//   footerAction?: () => void;
//   footerBottomInset?: number;
//   showBackdrop?: boolean;
// }

// const BSheet = React.forwardRef<BottomSheetModal, BSheetProps>(
//   (
//     {
//       children,
//       snapPoints = ['25%', '50%', '90%'],
//       onChange,
//       enablePanDownToClose = true,
//       enableDynamicSizing = false,
//       index = 1,
//       footerAction,
//       footerBottomInset = 25,
//       showBackdrop = false,
//       ...rest
//     },
//     ref,
//   ) => {
//     /* ---------------------------------- hooks --------------------------------- */
//     const { colors } = useTheme();
//     const { lightHaptic } = useHaptics();
//     /* ------------------------------- snap points ------------------------------ */
//     const points = useMemo(() => snapPoints, [snapPoints]);
//     /* -------------------------------- backdrop -------------------------------- */
//     const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
//       if (showBackdrop) {
//         return (
//           <BottomSheetBackdrop
//             {...props}
//             appearsOnIndex={0}
//             disappearsOnIndex={-1}
//             pressBehavior="close"
//           />
//         );
//       }
//       return undefined;
//     }, []);
//     /* --------------------------------- footer --------------------------------- */
//     const renderFooter = useCallback(
//       (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => {
//         if (footerAction) {
//           return (
//             <BottomSheetFooter {...props} bottomInset={footerBottomInset}>
//               <View style={styles.footerContainer}>
//                 <Pressable
//                   style={[styles.button, { backgroundColor: colors.primary }]}
//                   onPress={footerAction}
//                   onPressIn={lightHaptic}
//                 >
//                   <Ionicons name="close" size={26} color={colors.background} />
//                 </Pressable>
//               </View>
//             </BottomSheetFooter>
//           );
//         }
//         return undefined;
//       },
//       [colors.primary, colors.background, footerAction, footerBottomInset, lightHaptic],
//     );
//     /* --------------------------------- return --------------------------------- */
//     return (
//       <BottomSheetModal
//         ref={ref}
//         index={index}
//         snapPoints={points}
//         onChange={onChange}
//         enablePanDownToClose={enablePanDownToClose}
//         enableDynamicSizing={enableDynamicSizing}
//         backdropComponent={renderBackdrop}
//         footerComponent={renderFooter}
//         handleIndicatorStyle={{
//           backgroundColor: colors.border,
//           width: 40,
//         }}
//         backgroundStyle={{
//           backgroundColor: colors.card,
//         }}
//         {...rest}
//       >
//         <BottomSheetView
//           style={{
//             flex: 1,
//           }}
//         >
//           {children}
//         </BottomSheetView>
//       </BottomSheetModal>
//     );
//   },
// );

// const styles = StyleSheet.create({
//   footerContainer: {
//     alignSelf: 'flex-end',
//     marginRight: 12,
//   },
//   button: {
//     width: 45,
//     height: 45,
//     borderRadius: 22.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// });

// export default BSheet;
