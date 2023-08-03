import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer, { fetchRockets, setSelectedRocket, cancelReserveRocket } from '../../redux/rockets/rocketsSlice';
import Rockets from '../../pages/Rockets';

test('cancels rocket reservation', () => {
  const initialState = [
    {
      rocket_id: 'rocket_1',
      rocket_name: 'Falcon 1',
      description: 'This is a test rocket',
      flickr_images: ['image1'],
      reserved: true,
    },
  ];

  const action = cancelReserveRocket('rocket_1');

  const state = rocketsReducer(initialState, action);
  expect(state[0].reserved).toBe(false);
});

describe('Rockets Component', () => {
  let store;
  const mockData = [
    {
      rocket_id: 'rocket_1',
      rocket_name: 'Falcon 1',
      description: 'This is a test rocket',
      flickr_images: ['image1'],
      reserved: false,
    },
  ];

  beforeEach(() => {
    store = configureStore({ reducer: { rockets: rocketsReducer } });
    axios.get.mockResolvedValueOnce({ data: mockData });
  });

  test('renders Rockets component', async () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const rocketCard = await screen.findByText('Falcon 1');
    expect(rocketCard).toBeInTheDocument();
  });

  test('reserves a rocket', async () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const reserveButton = await screen.findByText('Reserve Rocket');
    fireEvent.click(reserveButton);

    await waitFor(() => {
      expect(store.getState().rockets[0].reserved).toBe(true);
    });
  });

  test('cancels a rocket reservation', async () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const reserveButton = await screen.findByText('Reserve Rocket');
    fireEvent.click(reserveButton);

    await waitFor(() => {
      expect(store.getState().rockets[0].reserved).toBe(true);
    });

    const cancelButton = await screen.findByText('Cancel Reservation');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(store.getState().rockets[0].reserved).toBe(false);
    });
  });
});
