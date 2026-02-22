import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: 'John Doe',
  dailyGoal: {
    calories: 2400,
    steps: 10000,
    water: 2.5, // Liters
    sleep: 8 // Hours
  },
  currentActivity: {
    calories: 1840,
    steps: 8245,
    water: 1.8,
    sleep: "7h 20m"
  }
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    updateActivity: (state, action) => {
      state.currentActivity = { ...state.currentActivity, ...action.payload };
    }
  }
});

export const { updateActivity } = healthSlice.actions;
export default healthSlice.reducer;