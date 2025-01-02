import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const mockWorkout = {
  id: '1',
  title: 'Full Body Workout',
  date: '2024-03-20',
  exercises: [
    {
      id: '1',
      name: 'Barbell Squat',
      sets: [
        { reps: 8, weight: 185, completed: true },
        { reps: 8, weight: 185, completed: true },
        { reps: 8, weight: 185, completed: true },
      ],
    },
    {
      id: '2',
      name: 'Bench Press',
      sets: [
        { reps: 10, weight: 155, completed: true },
        { reps: 10, weight: 155, completed: true },
        { reps: 8, weight: 155, completed: true },
      ],
    },
  ],
  userId: 'user123',
  notes: 'Great workout! Feeling strong today.',
};

export default function WorkoutId() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const workout = mockWorkout; // Replace with actual data fetching

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}
      >
        <ThemedText style={styles.title}>{workout.title}</ThemedText>
        <ThemedText style={styles.date}>{workout.date}</ThemedText>

        {workout.exercises.map((exercise) => (
          <ThemedView key={exercise.id} style={styles.exerciseCard}>
            <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>

            {exercise.sets.map((set, index) => (
              <ThemedView key={index} style={styles.setRow}>
                <ThemedText>Set {index + 1}:</ThemedText>
                <ThemedText>
                  {set.weight}lbs × {set.reps} reps
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        ))}

        {workout.notes && (
          <ThemedView style={styles.notesCard}>
            <ThemedText style={styles.notesTitle}>Notes</ThemedText>
            <ThemedText>{workout.notes}</ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    // paddingTop: 24,
    // padding: 16,
    // paddingTop: 14,
  },
  scrollViewContent: {
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
  exerciseCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  notesCard: {
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});
