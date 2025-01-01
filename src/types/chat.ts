export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  workout?: WorkoutPlan;
};

export type WorkoutExercise = {
  name: string;
  sets: number;
  reps: number;
  rest: number;
  notes?: string;
};

export type WorkoutPlan = {
  title: string;
  description: string;
  exercises: WorkoutExercise[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  targetMuscleGroups: string[];
};
