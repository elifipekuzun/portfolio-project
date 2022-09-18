import { cellReducer } from './cells-reducer';
import { combineReducers } from 'redux';

export const reducers = combineReducers({
  cells: cellReducer,
});

export type RootState = ReturnType<typeof reducers>;
