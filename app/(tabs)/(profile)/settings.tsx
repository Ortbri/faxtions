import type { ColorsType } from '@/types/colors';
import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function Settings() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingBottom: tabBarHeight,
      }}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            { backgroundColor: colors.card },
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.settingContent}>
            <Ionicons name="person-outline" size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            { backgroundColor: colors.card },
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.settingContent}>
            <Ionicons name="notifications-outline" size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
          </View>
          <Switch />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            { backgroundColor: colors.card },
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.settingContent}>
            <Ionicons name="color-palette-outline" size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Appearance</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            { backgroundColor: colors.card },
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.settingContent}>
            <Ionicons name="language-outline" size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            { backgroundColor: colors.card },
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.settingContent}>
            <Ionicons name="fitness-outline" size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Units</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            { backgroundColor: colors.card },
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.settingContent}>
            <Ionicons name="help-circle-outline" size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Help Center</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            { backgroundColor: colors.card },
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.settingContent}>
            <Ionicons name="document-text-outline" size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    section: {
      padding: 16,
      gap: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      opacity: 0.8,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 12,
    },
    settingContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    settingText: {
      fontSize: 16,
    },
  });
