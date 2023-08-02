import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch missions data
export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    const response = await axios.get('https://api.spacexdata.com/v3/missions');
    return response.data.map((mission) => ({
      mission_id: mission.mission_id,
      mission_name: mission.mission_name,
      description: mission.description,
      reserved: false, // Add reserved field to each mission
    }));
  },
);

// Missions slice
export const missionsSlice = createSlice({
  name: 'missions',
  initialState: { missions: [], loading: false },
  reducers: {
    // Reducer to reserve a mission
    reserveMission: (state, action) => {
      const mission = state.missions.find((mission) => mission.mission_id === action.payload);
      if (mission) {
        mission.reserved = true;
      }
    },
    // Reducer to leave a mission
    leaveMission: (state, action) => {
      const mission = state.missions.find((mission) => mission.mission_id === action.payload);
      if (mission) {
        mission.reserved = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMissions.fulfilled, (state, action) => {
      state.missions = action.payload;
      state.loading = false;
    });
  },
});

export const { reserveMission, leaveMission } = missionsSlice.actions;

export default missionsSlice.reducer;
