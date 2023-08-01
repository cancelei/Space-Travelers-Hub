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
    }));
  },
);

// Missions slice
export const missionsSlice = createSlice({
  name: 'missions',
  initialState: { missions: [], loading: false },
  reducers: {},
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

export default missionsSlice.reducer;
