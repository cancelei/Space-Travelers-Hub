import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit'
import rocketsReducer, { fetchRockets, setSelectedRocket, cancelReserveRocket } from '../../redux/rockets/rocketsSlice';

jest.mock('axios');

describe('rocketsSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { rockets: rocketsReducer } });
  });

  test('fetches rockets from API and updates state', async () => {
    const mockData = [
      {
        rocket_id: 'rocket_1',
        rocket_name: 'Falcon 1',
        description: 'This is a test rocket',
        flickr_images: ['image1'],
        reserved: false,
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(fetchRockets());

    expect(store.getState().rockets[0].rocket_id).toEqual('rocket_1');
    expect(store.getState().rockets[0].rocket_name).toEqual('Falcon 1');
  });
});

test('reserves a rocket', () => {
  const initialState = [
    {
      rocket_id: 'rocket_1',
      rocket_name: 'Falcon 1',
      description: 'This is a test rocket',
      flickr_images: ['image1'],
      reserved: false,
    },
  ];

  const action = setSelectedRocket({
    rocket_id: 'rocket_1',
    rocket_name: 'Falcon 1',
    description: 'This is a test rocket',
    flickr_images: ['image1'],
    reserved: true,
  });

  const state = rocketsReducer(initialState, action);
  expect(state[0].reserved).toBe(true);
});