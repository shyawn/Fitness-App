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
    setWorkoutOrder: (state, action: PayloadAction<Workout[]>) => {
      state = action.payload;
    },
  },
});

export const { addWorkout, setWorkoutOrder } = workoutSlice.actions;
export default workoutSlice.reducer;
