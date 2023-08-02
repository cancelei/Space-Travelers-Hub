import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Dragons, { Dragon } from '../../pages/dragons';
import { reserveDragon, cancelDragonReservation, dragonsSlice } from '../../redux/dragons/dragonsSlice';

// Mock the store
const mockStore = configureMockStore();
const store = mockStore({
  dragons: {
    list: [
      {
        dragonId: '1',
        dragonName: 'Dragon 1',
        description: 'Test Dragon',
        flickrImages: ['image_url'],
        reserved: false,
      },
    ],
  },
});

// Test the Dragon component
describe('Dragon Component', () => {
  const dragon = {
    dragonId: '1',
    dragonName: 'Dragon 1',
    description: 'Test Dragon',
    flickrImages: ['image_url'],
    reserved: false,
  };

  it('should render the Dragon component', () => {
    render(<Provider store={store}><Dragon dragon={dragon} /></Provider>);
    expect(screen.getByText('Dragon 1')).toBeInTheDocument();
  });

  it('should handle Reserve Dragon button click', () => {
    render(<Provider store={store}><Dragon dragon={dragon} /></Provider>);
    fireEvent.click(screen.getByText('Reserve Dragon'));
    // Verify button text change or other UI changes after reservation
  });

  it('should handle Cancel Reservation button click', () => {
    dragon.reserved = true;
    render(<Provider store={store}><Dragon dragon={dragon} /></Provider>);
    fireEvent.click(screen.getByText('Cancel Reservation'));
    // Verify button text change or other UI changes after canceling reservation
  });
});

// Test the Dragons container component
describe('Dragons Container', () => {
  it('should render Dragons container', () => {
    render(<Provider store={store}><Dragons /></Provider>);
    expect(screen.getByText('Dragon 1')).toBeInTheDocument();
  });
});

// Test the dragons slice
describe('Dragons Slice', () => {
  it('should handle reserveDragon action', () => {
    const initialState = { list: [{ dragonId: '1', reserved: false }] };
    const state = dragonsSlice.reducer(initialState, reserveDragon('1'));
    expect(state.list[0].reserved).toBeTruthy();
  });

  it('should handle cancelDragonReservation action', () => {
    const initialState = { list: [{ dragonId: '1', reserved: true }] };
    const state = dragonsSlice.reducer(initialState, cancelDragonReservation('1'));
    expect(state.list[0].reserved).toBeFalsy();
  });
});
