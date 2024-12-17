export type Exercise = {
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  videoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
};

export type WorkoutPlan = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  exercises: WorkoutExercise[];
  tags: string[];
};

export type WorkoutExercise = {
  exercise: Exercise;
  sets: number;
  reps: number;
  restTime: number; // in seconds
  notes?: string;
};

export type UserProgress = {
  id: string;
  userId: string;
  workoutPlanId: string;
  completedExercises: {
    exerciseId: string;
    sets: {
      reps: number;
      weight?: number;
      completed: boolean;
    }[];
  }[];
  date: string;
  notes?: string;
};
