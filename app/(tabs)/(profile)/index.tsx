import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <ScrollView
      // contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      // contentContainerStyle={{
      //   paddingBottom: tabBarHeight,
      // }}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          contentFit="cover"
          style={styles.profileImage}
        />
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.handle, { color: colors.text }]}>@johndoe</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>124</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Workouts</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>48</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>AI Plans</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>892</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Hours</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.bio, { color: colors.text }]}>
          Fitness Enthusiast | 5x/week | Strength & HIIT Training
        </Text>
      </View>

      <View style={styles.achievementsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Achievements</Text>
        <View style={styles.achievements}>
          <View style={[styles.achievement, { backgroundColor: colors.card }]}>
            <Text style={[styles.achievementTitle, { color: colors.text }]}>30 Day Streak</Text>
            <Text style={[styles.achievementDesc, { color: colors.text }]}>
              Completed workouts consistently
            </Text>
          </View>
          <View style={[styles.achievement, { backgroundColor: colors.card }]}>
            <Text style={[styles.achievementTitle, { color: colors.text }]}>Personal Best</Text>
            <Text style={[styles.achievementDesc, { color: colors.text }]}>
              Bench Press: 225lbs
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Pressable
          onPress={() => router.navigate('/(tabs)/(profile)/settings')}
          style={[styles.settingsButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.settingsButtonText}>Edit Profile</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      // backgroundColor: colors.background,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    profileImage: {
      height: 120,
      width: 120,
      borderRadius: 60,
      marginBottom: 12,
    },
    name: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 4,
    },
    handle: {
      fontSize: 16,
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 16,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 18,
      fontWeight: '600',
    },
    statLabel: {
      fontSize: 14,
      marginTop: 4,
    },
    statDivider: {
      width: StyleSheet.hairlineWidth,
    },
    section: {
      padding: 16,
    },
    bio: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
    },
    achievementsContainer: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
    achievements: {
      gap: 12,
    },
    achievement: {
      padding: 16,
      borderRadius: 8,
    },
    achievementTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    achievementDesc: {
      fontSize: 14,
      opacity: 0.8,
    },
    settingsButton: {
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
    },
    settingsButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
