import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch rockets data
export const fetchRockets = createAsyncThunk(
  'rockets/fetchRockets',
  async () => {
    console.log('fetchRockets async action called');
    const response = await axios.get('https://api.spacexdata.com/v4/rockets');
    return response.data.map((rocket) => ({
      rocket_id: rocket.id,
      rocket_name: rocket.name,
      description: rocket.description,
      flickr_images: rocket.flickr_images,
    }));
  },
);

export const setSelectedRocket = createAsyncThunk(
  'rockets/setSelectedRocket',
  async (rocketData) => rocketData,
);

// Rockets slice
export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.fulfilled, (state, action) => action.payload);
  },
});

export default rocketsSlice.reducer;
