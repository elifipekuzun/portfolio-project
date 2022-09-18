import produce from 'immer';
import { Cell } from '../cell';
import { Actions } from '../actions';
import { ActionTypes } from '../action-types';

interface CellsState {
  data: {
    [key: string]: Cell;
  };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellsState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};

export const cellReducer = produce(
  (state: CellsState = initialState, action: Actions) => {
    switch (action.type) {
      case ActionTypes.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionTypes.DELETE_CELL:
        const cellId = action.payload.id;
        delete state.data[cellId];
        state.order = state.order.filter((id) => id !== cellId);
        return state;
      case ActionTypes.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;
      case ActionTypes.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        };
        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (foundIndex < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, cell.id);
        }
        return state;
      default:
        return state;
    }
  },
  initialState
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};
