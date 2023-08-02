import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch rockets data
export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/rockets');
  return response.data.map((rocket) => ({
    rocket_id: rocket.id,
    rocket_name: rocket.name,
    description: rocket.description,
    flickr_images: rocket.flickr_images,
    reserved: false, // Add the 'reserved' property with initial value set to false
  }));
});

export const setSelectedRocket = createAsyncThunk('rockets/setSelectedRocket', async (rocketData) => rocketData);

// Rockets slice
export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.fulfilled, (state, action) => action.payload);
    builder.addCase(setSelectedRocket.fulfilled, (state, action) => {
      const selectedRocketId = action.payload.rocket_id;

      // Use map() to create a new state with the selected rocket marked as reserved
      // eslint-disable-next-line max-len
      return state.map((rocket) => (rocket.rocket_id === selectedRocketId ? { ...rocket, reserved: true } : rocket));
    });
  },
});

export default rocketsSlice.reducer;
