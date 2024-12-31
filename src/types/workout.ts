export type Exercise = {
  id: string;
  name: string;
  sets: Set[];
};

export type Set = {
  reps: number;
  weight: number;
  completed: boolean;
};

export type Workout = {
  id: string;
  title: string;
  date: string;
  exercises: Exercise[];
  userId: string;
  notes?: string;
};
