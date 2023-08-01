import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './missions/missionsSlice';
import rocketsReducer from './rockets/rocketsSlice';
import dragonsReducer from './dragons/dragonsSlice'; // Importar el reducer de dragones

const rootReducer = {
  missions: missionsReducer,
  rockets: rocketsReducer,
  dragons: dragonsReducer, // Agregar el reducer de dragones
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
