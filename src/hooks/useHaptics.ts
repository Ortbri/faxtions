import * as Haptics from 'expo-haptics';

const useHaptics = () => {
  // Light haptic feedback
  const lightHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Medium haptic feedback
  const mediumHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Heavy haptic feedback
  const heavyHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  // Success haptic feedback
  const successHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  // Warning haptic feedback
  const warningHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  // Error haptic feedback
  const errorHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  return {
    lightHaptic,
    mediumHaptic,
    heavyHaptic,
    successHaptic,
    warningHaptic,
    errorHaptic,
  };
};

export default useHaptics;
