import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDragons = createAsyncThunk(
  'dragons/fetchDragons',
  async () => {
    const response = await axios.get('https://api.spacexdata.com/v4/dragons');
    return response.data.map((dragon) => ({
      dragon_id: dragon.id,
      dragon_name: dragon.name,
      description: dragon.description,
      flickr_images: dragon.flickr_images,
    }));
  },
);

export const dragonsSlice = createSlice({
  name: 'dragons',
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDragons.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default dragonsSlice.reducer;
