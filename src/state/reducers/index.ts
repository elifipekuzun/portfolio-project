import { cellReducer } from './cells-reducer';
import { bundleReducer } from './bundles-reducer';
import { combineReducers } from 'redux';

export const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundleReducer,
});

export type RootState = ReturnType<typeof reducers>;
