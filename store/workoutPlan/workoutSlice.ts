import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Workout } from "@/types";

const initialState: Workout[] = [];

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.push(action.payload);
    },
    deleteWorkout: (state, action: PayloadAction<Workout>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    setWorkoutOrder: (state, action: PayloadAction<Workout[]>) => {
      return action.payload;
    },
  },
});

export const { addWorkout, deleteWorkout, setWorkoutOrder } =
  workoutSlice.actions;
export default workoutSlice.reducer;
